const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const { validateListing, isLoggedIn, isOwner } = require('../middleware.js');

const listingController = require("../controller/listings.js");
const multer = require('multer');
const { storage } = require('../cloudConfig_temp.js');
const upload = multer( {storage} );

router
    .route('/')
    .get(wrapAsync(listingController.index)) //index rote
    .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing)); //create route

//new route
router.get('/new', isLoggedIn, listingController.renderNewForm);

router
    .route('/:id')
    .get(wrapAsync(listingController.showListing)) //show route
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing)) //update route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)); //delete route

//edit route
router.get('/:id/edit', isOwner, isLoggedIn, wrapAsync(listingController.renderEditForm));

module.exports = router;
