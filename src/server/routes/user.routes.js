const {create, read, update, del} = require('../../domain/user/CRUD')
const {auth, refresh, isAuthenticated} = require('../../domain/user/auth')
const {validateCreate, validateUpdate} = require('./validation/user.validation')
const rootDomain = "user"

module.exports = router => {
  router.get(`/${rootDomain}`, isAuthenticated, read)
  router.post(`/${rootDomain}`, isAuthenticated, validateCreate, create)
  router.put(`/${rootDomain}/:user_id`, isAuthenticated, validateUpdate, update)
  router.delete(`/${rootDomain}/:user_id`, isAuthenticated, del)
  router.post(`/${rootDomain}/auth`, auth)
  router.post(`/${rootDomain}/auth/refresh`, isAuthenticated, refresh)
}