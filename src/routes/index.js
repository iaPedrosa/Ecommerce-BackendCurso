//index js para las routes
import productsRouter from './products.router.js';
import productsRouterAPI from './productsAPI.router.js';
import cartsRouter from './carts.router.js';
import ApiDocumentationRouter from './documentation.router.js';
import realtimeproductsRouter from './realtimeproducts.router.js';
import userRouter from './user.router.js';
import userAPIRouter from './userapi.router.js';

import viewsRouter from './views.router.js';
import cartsPageRouter from './cartPage.router.js';
import sessionsRouter from './sessions.router.js';
import ticketsRouter from './tickets.router.js';
import loggerRouter from './logger.router.js';
import adminRouter from './admin.router.js';
import userPanelRouter from './userPanel.router.js';



import { Router } from "express";
const router = Router();

router.use('/loggertest', loggerRouter);
router.use('/documentation', ApiDocumentationRouter);
router.use('/cart', cartsPageRouter);
router.use('/realtimeproducts', realtimeproductsRouter);
router.use('/',viewsRouter)
router.use('/users',userRouter)
router.use('/api/users',userAPIRouter)

router.use('/products',productsRouter)
router.use('/api/products', productsRouterAPI);
router.use('/api/carts', cartsRouter);
router.use('/api/sessions', sessionsRouter);
router.use('/api/tickets', ticketsRouter)
router.use('/admin',adminRouter)
router.use('/userpanel',userPanelRouter)

router.get('*', (req, res)=>{
    res.render('404error');
    
    
});


export default router;
