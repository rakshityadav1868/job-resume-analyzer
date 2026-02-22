from fastapi import FastAPI,Form
from fastapi.middleware.cors import CORSMiddleware
import nltk
import re
from  nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer #to bring word in root form
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
nltk.download('punkt_tab') #helps while tokenization
nltk.download('stopwords')
nltk.download('wordnet') #used for lemmatizer

app=FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)
def preprocess(text):
  text=text.lower()

  text= re.sub(r'[^a-zA-z\s]',"",text) #re.sub python ka replace jaisa hai and [^a-zA-z\s] isme hai iske alava isko empty string se replace 

  tokens=nltk.word_tokenize(text)

#stopwords
  stop_words=set(stopwords.words("english"))
  filtered=[]
  for i in tokens:
    if i not in stop_words:
      filtered.append(i)
  tokens=filtered

  #lemmitization
  lemmatizer=WordNetLemmatizer()
  lemmatized=[]
  for i in tokens:
    res=lemmatizer.lemmatize(i)
    lemmatized.append(res)
  tokens=lemmatized

  return " ".join(tokens)

@app.post("/analyze")
async def analyze(resume_text: str=Form(...), job_description: str=Form(...)):

    cleaned_resume=preprocess(resume_text)
    cleaned_jobdesc=preprocess(job_description)

    vectorizer= TfidfVectorizer()
    vectors=vectorizer.fit_transform([cleaned_resume,cleaned_jobdesc])
    score=cosine_similarity(vectors[0],vectors[1]) # score 2d array aayega [[]] outside one is row and other is coloumn
    match_score=round(score[0][0]*100,2)
    return {"match_score": match_score}
