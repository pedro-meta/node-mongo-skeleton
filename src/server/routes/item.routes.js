module.exports = router => {
  router.get('/item', (req, res, next) =>{
      return res.send("GET ITEM CALLED");
  })
  router.post('/item', (req, res, next) =>{
      return res.send("POST ITEM CALLED");
  })
  router.put('/item/:item_id', (req, res, next) =>{
      return res.send("PUT ITEM CALLED");
  })
  router.delete('/item/:item_id', (req, res, next) =>{
      return res.send("DELETE ITEM CALLED");
  })
}