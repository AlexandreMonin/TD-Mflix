# TD MFlix
> Alexandre Monin
>
> MAALSI 24-2

---

### Requête

1. Nombre de total de film 
```
db["movies"].find({type : "movie"}).count()

// output: 23285
```

2. Nombre de total de séries 
```
db["movies"].find({type : "series"}).count()

// output: 254
```

3. Les différents types de contenus
```
db["movies"].distinct("type")

// output: [ 'movie', 'series' ] 
```

4. Les différents genres dans la collection
```
db["movies"].distinct("genres")

// output: [
  'Action',      'Adventure', 'Animation',
  'Biography',   'Comedy',    'Crime',
  'Documentary', 'Drama',     'Family',
  'Fantasy',     'Film-Noir', 'History',
  'Horror',      'Music',     'Musical',
  'Mystery',     'News',      'Romance',
  'Sci-Fi',      'Short',     'Sport',
  'Talk-Show',   'Thriller',  'War',
  'Western'
]
```

5. Les films depuis 2015 par ordre décroissant
```
db["movies"].find({type : "movie", released : {$gte: ISODate("2015-01-01T00:00:00Z")}}).sort({released: -1})
```

6. Les films depuis 2015, avec au moins 5 prix par ordre décroissant
```
db["movies"].find({type : "movie", released : {$gte: ISODate("2015-01-01T00:00:00Z")}, "awards.wins" : {$gte: 5}}).sort({released: -1})
```

7. Les films depuis 2015, avec au moins 5 prix par ordre décroissant et en francais
```
db["movies"].find({type : "movie", released : {$gte: ISODate("2015-01-01T00:00:00Z")}, "awards.wins" : {$gte: 5}, languages : "French"}).sort({released: -1})
```