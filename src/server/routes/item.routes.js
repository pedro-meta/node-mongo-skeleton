const {create, read, update, del} = require('../../domain/item/CRUD')
const {isAuthenticated} = require('../../domain/user/auth')
const {validateCreate, validateUpdate} = require('./validation/item.validation')
const rootDomain = "item"

module.exports = router => {
  router.get(`/${rootDomain}`,read)
  router.post(`/${rootDomain}`, validateCreate, create)
  router.put(`/${rootDomain}:item_id`, validateUpdate, update)
  router.delete(`/${rootDomain}/:item_id`, del)
}