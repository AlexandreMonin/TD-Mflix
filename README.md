# TD MFlix
> Alexandre Monin
>
> MAALSI 24-2

---

### Requête

1. Nombre de total de film 
```
db["movies"].find({"type" : "movie"}).count()

// output: 23285
```

2. Nombre de total de séries 
```
db["movies"].find({"type" : "series"}).count()

// output: 254
```

3. Les différents types de contenus
```
db["movies"].distinct("type")

// output: [ 'movie', 'series' ] 
```