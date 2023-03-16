var express = require('express');
var router = express.Router();
const { ensureAuthenticated } = require('../config/authenticate');
var aes256 = require('aes256');
const Vault = require('../models/vault');
const Website = require('../models/website');
const Application = require('../models/application');
const BankCard = require('../models/bankCard');
const ObjectId = require('mongodb').ObjectID;
require('dotenv').config();

// // Common page
/* All Entries page */
router.get('/all-entries', ensureAuthenticated, (req, res, next) => {
  try {
    Vault.find({ user: req.user._id }, (err, myVault) => {
      var css = [
        {
          uri: '../css/sidebar.css',
        },
        {
          uri: 'https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css',
        },
        {
          uri: '../clipboard',
        },
      ];

      let cipher = aes256.createCipher(req.user.password);

      myVault.forEach((vault) => {
        myVault = vault;
      });

      if (myVault.websites.length > 0) {
        myVault.websites.forEach((website) => {
          website.name = cipher.decrypt(website.name);
          website.url = cipher.decrypt(website.url);
          website.email = cipher.decrypt(website.email);
          website.password = cipher.decrypt(website.password);
        });
      }
      if (myVault.applications.length > 0) {
        myVault.applications.forEach((application) => {
          application.name = cipher.decrypt(application.name);
          application.device = cipher.decrypt(application.device);
          application.email = cipher.decrypt(application.email);
          application.password = cipher.decrypt(application.password);
        });
      }
      if (myVault.bankCards.length > 0) {
        myVault.bankCards.forEach((bankCard) => {
          bankCard.name = cipher.decrypt(bankCard.name);
          bankCard.cardNumber = cipher.decrypt(bankCard.cardNumber);
          bankCard.holderName = cipher.decrypt(bankCard.holderName);
          bankCard.expiry = cipher.decrypt(bankCard.expiry);
          bankCard.cvv = cipher.decrypt(bankCard.cvv);
        });
      }

      res.render('vault/general', {
        title: 'Stone Wall',
        type: 'All',
        myVault,
        styles: css,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

// Wesite page
router.get('/websites', ensureAuthenticated, async (req, res, next) => {
  try {
    Vault.find({ user: req.user._id }, (err, myVault) => {
      var css = [
        {
          uri: '../css/sidebar.css',
        },
        {
          uri: 'https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css',
        },
        {
          uri: '../clipboard',
        },
      ];

      let cipher = aes256.createCipher(req.user.password);

      myVault.forEach((vault) => {
        myVault = vault;
      });

      if (myVault.websites.length > 0) {
        myVault.websites.forEach((website) => {
          website.name = cipher.decrypt(website.name);
          website.url = cipher.decrypt(website.url);
          website.email = cipher.decrypt(website.email);
          website.password = cipher.decrypt(website.password);
        });
      }

      myVault.applications = [];
      myVault.bankCards = [];

      res.render('vault/general', {
        title: 'Stone Wall - Websites',
        type: 'Websites',
        myVault,
        styles: css,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

// Application page
router.get('/applications', ensureAuthenticated, (req, res, next) => {
  try {
    Vault.find({ user: req.user._id }, (err, myVault) => {
      var css = [
        {
          uri: '../css/sidebar.css',
        },
        {
          uri: 'https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css',
        },
        {
          uri: '../clipboard',
        },
      ];

      let cipher = aes256.createCipher(req.user.password);

      myVault.forEach((vault) => {
        myVault = vault;
      });

      if (myVault.applications.length > 0) {
        myVault.applications.forEach((application) => {
          application.name = cipher.decrypt(application.name);
          application.device = cipher.decrypt(application.device);
          application.email = cipher.decrypt(application.email);
          application.password = cipher.decrypt(application.password);
        });
      }

      myVault.websites = [];
      myVault.bankCards = [];

      res.render('vault/general', {
        title: 'Stone Wall - Application',
        type: 'Applications',
        myVault,
        styles: css,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

// Bank Card page
router.get('/bank-cards', ensureAuthenticated, (req, res, next) => {
  try {
    Vault.find({ user: req.user._id }, (err, myVault) => {
      var css = [
        {
          uri: '../css/sidebar.css',
        },
        {
          uri: 'https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css',
        },
        {
          uri: '../clipboard',
        },
      ];

      let cipher = aes256.createCipher(req.user.password);

      myVault.forEach((vault) => {
        myVault = vault;
      });

      if (myVault.bankCards.length > 0) {
        myVault.bankCards.forEach((bankCard) => {
          bankCard.name = cipher.decrypt(bankCard.name);
          bankCard.cardNumber = cipher.decrypt(bankCard.cardNumber);
          bankCard.holderName = cipher.decrypt(bankCard.holderName);
          bankCard.expiry = cipher.decrypt(bankCard.expiry);
          bankCard.cvv = cipher.decrypt(bankCard.cvv);
        });
      }

      myVault.applications = [];
      myVault.websites = [];

      res.render('vault/general', {
        title: 'Stone Wall - Bank Card',
        type: 'Bank-Cards',
        myVault,
        styles: css,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

// // Common page - ends

// password generator page
router.get(
  '/password-generator',
  ensureAuthenticated,
  async (req, res, next) => {
    try {
      var css = [
        {
          uri: '../css/sidebar.css',
        },
        {
          uri: 'https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css',
        },
        {
          uri: '../clipboard',
        },
      ];

      res.render('vault/passwordGenerator', {
        title: 'Stone Wall - Password Generator',
        styles: css,
        type: 'none',
      });
    } catch (error) {
      console.log(error);
    }
  }
);

// // All Post methods
/* POST add website modal user page. */
router.post('/websites', async (req, res) => {
  const { addWebsiteName, addWebsiteUrl, addWebsiteEmail, addWebsitePassword } =
    req.body;

  let cipher = aes256.createCipher(req.user.password);

  const newWebsite = new Website({
    name: cipher.encrypt(addWebsiteName),
    url: cipher.encrypt(addWebsiteUrl),
    email: cipher.encrypt(addWebsiteEmail),
    password: cipher.encrypt(addWebsitePassword),
  });

  await Vault.findOneAndUpdate(
    {
      user: ObjectId(req.user._id),
    },
    {
      $push: {
        websites: newWebsite,
      },
    }
  );

  res.redirect('websites');
});

/* POST add application modal user page. */
router.post('/applications', async (req, res) => {
  const {
    addApplicationName,
    addApplicationDevice,
    addApplicationEmail,
    addApplicationPassword,
  } = req.body;

  let cipher = aes256.createCipher(req.user.password);

  const newApplication = new Application({
    name: cipher.encrypt(addApplicationName),
    device: cipher.encrypt(addApplicationDevice),
    email: cipher.encrypt(addApplicationEmail),
    password: cipher.encrypt(addApplicationPassword),
  });

  await Vault.findOneAndUpdate(
    {
      user: ObjectId(req.user._id),
    },
    {
      $push: {
        applications: newApplication,
      },
    }
  );

  res.redirect('applications');
});

/* POST add bank card modal user page. */
router.post('/bank-cards', async (req, res) => {
  const {
    addBankCardName,
    addBankCardCardNumber,
    addBankCardHolderName,
    addBankCardExpiry,
    addBankCardCVV,
  } = req.body;

  let cipher = aes256.createCipher(req.user.password);

  const newBankCard = new BankCard({
    name: cipher.encrypt(addBankCardName),
    cardNumber: cipher.encrypt(addBankCardCardNumber),
    holderName: cipher.encrypt(addBankCardHolderName),
    expiry: cipher.encrypt(addBankCardExpiry),
    cvv: cipher.encrypt(addBankCardCVV),
  });

  await Vault.findOneAndUpdate(
    {
      user: ObjectId(req.user._id),
    },
    {
      $push: {
        bankCards: newBankCard,
      },
    }
  );

  res.redirect('bank-cards');
});

// POST edit Website
router.post('/websites/edit/:id', async (req, res) => {
  const referer = req.headers.referer;
  const {
    editWebsiteName,
    editWebsiteUrl,
    editWebsiteEmail,
    editWebsitePassword,
  } = req.body;
  const id = req.params.id;

  let cipher = aes256.createCipher(req.user.password);

  await Vault.updateOne(
    {
      user: ObjectId(req.user._id),
      'websites._id': ObjectId(id),
    },
    {
      $set: {
        'websites.$.name': cipher.encrypt(editWebsiteName),
        'websites.$.url': cipher.encrypt(editWebsiteUrl),
        'websites.$.email': cipher.encrypt(editWebsiteEmail),
        'websites.$.password': cipher.encrypt(editWebsitePassword),
      },
    }
  );
  // TODO:  Fix this
  res.redirect(referer || '../../websites');
});

// POST edit Application
router.post('/applications/edit/:id', async (req, res) => {
  const referer = req.headers.referer;
  const {
    editApplicationName,
    editApplicationDevice,
    editApplicationEmail,
    editApplicationPassword,
  } = req.body;
  const id = req.params.id;

  let cipher = aes256.createCipher(req.user.password);

  await Vault.updateOne(
    {
      user: ObjectId(req.user._id),
      'applications._id': ObjectId(id),
    },
    {
      $set: {
        'applications.$.name': cipher.encrypt(editApplicationName),
        'applications.$.device': cipher.encrypt(editApplicationDevice),
        'applications.$.email': cipher.encrypt(editApplicationEmail),
        'applications.$.password': cipher.encrypt(editApplicationPassword),
      },
    }
  );
  // TODO:  Fix this
  res.redirect(referer || '../../applications');
});

// POST edit Application
router.post('/bank-cards/edit/:id', async (req, res) => {
  const referer = req.headers.referer;
  const {
    editBankCardName,
    editBankCardCardNumber,
    editBankCardHolderName,
    editBankCardExpiry,
    editBankCardCVV,
  } = req.body;
  const id = req.params.id;

  let cipher = aes256.createCipher(req.user.password);

  await Vault.updateOne(
    {
      user: ObjectId(req.user._id),
      'bankCards._id': ObjectId(id),
    },
    {
      $set: {
        'bankCards.$.name': cipher.encrypt(editBankCardName),
        'bankCards.$.cardNumber': cipher.encrypt(editBankCardCardNumber),
        'bankCards.$.holderName': cipher.encrypt(editBankCardHolderName),
        'bankCards.$.expiry': cipher.encrypt(editBankCardExpiry),
        'bankCards.$.cvv': cipher.encrypt(editBankCardCVV),
      },
    }
  );
  // TODO: Fix this
  res.redirect(referer || '../../bank-cards');
});

// Delete Req
// delete Website
router.get('/websites/delete/:id', async (req, res) => {
  const referer = req.headers.referer;
  const id = req.params.id;

  try {
    await Vault.findOneAndUpdate(
      {
        user: ObjectId(req.user._id),
      },
      {
        $pull: {
          websites: {
            _id: ObjectId(id),
          },
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
  res.redirect(referer || '../../websites');
});

// delete Application
router.get('/applications/delete/:id', async (req, res) => {
  const referer = req.headers.referer;
  const id = req.params.id;

  try {
    await Vault.findOneAndUpdate(
      {
        user: ObjectId(req.user._id),
      },
      {
        $pull: {
          applications: {
            _id: ObjectId(id),
          },
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
  res.redirect(referer || '../../applications');
});

// delete Bank Card
router.get('/bank-cards/delete/:id', async (req, res) => {
  const referer = req.headers.referer;
  const id = req.params.id;

  await Vault.findOneAndUpdate(
    {
      user: ObjectId(req.user._id),
    },
    {
      $pull: {
        bankCards: {
          _id: ObjectId(id),
        },
      },
    }
  );
  res.redirect(referer || '../../bank-cards');
});
module.exports = router;
