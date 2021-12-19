const {create, read, update, del} = require('../../domain/user/CRUD')
const {auth} = require('../../domain/user/auth')
const {validateCreate} = require('./validation/user.validation')
const rootDomain = "user"

module.exports = router => {
  router.get(`/${rootDomain}`, read)
  router.post(`/${rootDomain}`, validateCreate, create)
  router.put(`/${rootDomain}:user_id`, update)
  router.delete(`/${rootDomain}/:user_id`, del)
  router.post(`/${rootDomain}/login`, auth)
}