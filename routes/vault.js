var express = require("express");
var router = express.Router();
const { ensureAuthenticated } = require("../config/authenticate");
var aes256 = require("aes256");
const User = require("../models/user");
const Vault = require("../models/vault");
const Website = require("../models/website");
const Application = require("../models/application");
const BankCard = require("../models/bankCard");
require("dotenv").config();

const key = process.env.ENCRYPTION_KEY;

var cipher = aes256.createCipher(key);

const getVault = Vault.find({});

// const key = ;

// /* GET users listing. */
// router.get("/", async (req, res, next) => {

//   Vault.findOne({user: req.user._id,}, (err, vault) => {
//     // change all vault.websit
//     vault.websites.forEach((website) => {
//       website.name = cipher.decrypt(website.name)
//       website.url = cipher.decrypt(website.url)
//       website.email = cipher.decrypt(website.email)
//       website.password = cipher.decrypt(website.password)
//     })
//     res.render('test',{
//       vault,
//       // user: req.user.name
//     });
//   })

// });

// /* GET Master Password page. */
// router.get("/favourates", ensureAuthenticated, (req, res, next) => {
//   try {
//     Vault.find({}, (err, myVault) => {
//       var css = [
//         {
//           uri: "../css/sidebar.css",
//         },
//         {
//           uri: "https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css",
//         },
//         {
//           uri: "../clipboard",
//         },
//       ];

//       res.render("vault/favourates", {
//         title: "MyVault",
//         type: "None",
//         // user: req.user,
//         myVault,
//         styles: css,
//       });
//     })
//   } catch (error) {
//     console.log(error)
//   }
// });

// // Common page
/* All Entries page */
router.get("/all-entries", ensureAuthenticated, (req, res, next) => {
  try {
    Vault.find({ user: req.user._id }, (err, myVault) => {
      var css = [
        {
          uri: "../css/sidebar.css",
        },
        {
          uri: "https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css",
        },
        {
          uri: "../clipboard",
        },
      ];

      // //Decrypt
      // myVault.websites.forEach((website) => {
      //   website.name = cipher.decrypt(website.name)
      //   website.url = cipher.decrypt(website.url)
      //   website.email = cipher.decrypt(website.email)
      //   website.password = cipher.decrypt(website.password)
      // })
      // //Decrypt
      // myVault.applications.forEach((application) => {
      //   application.name = cipher.decrypt(application.name)
      //   application.device = cipher.decrypt(application.device)
      //   application.email = cipher.decrypt(application.email)
      //   application.password = cipher.decrypt(application.password)
      // })
      //   //Decrypt
      //   myVault.bankCards.forEach((bankCard) => {
      //     bankCard.name = cipher.decrypt(bankCard.name)
      //     bankCard.cardNumber = cipher.decrypt(bankCard.cardNumber)
      //     bankCard.holderName = cipher.decrypt(bankCard.holderName)
      //     bankCard.expiry = cipher.decrypt(bankCard.expiry)
      //     bankCard.cvv = cipher.decrypt(bankCard.cvv)
      //   })

      myVault.forEach((myVault) => {
        if (myVault.websites.length > 0) {
          myVault.websites.forEach((website) => {
            website.name = cipher.decrypt(website.name);
            website.url = cipher.decrypt(website.url);
            website.email = cipher.decrypt(website.email);
            website.password = cipher.decrypt(website.password);
          });
        }
      });
      myVault.forEach((myVault) => {
        if (myVault.applications.length > 0) {
          myVault.applications.forEach((application) => {
            application.name = cipher.decrypt(application.name);
            application.device = cipher.decrypt(application.device);
            application.email = cipher.decrypt(application.email);
            application.password = cipher.decrypt(application.password);
          });
        }
      });
      myVault.forEach((myVault) => {
        if (myVault.bankCards.length > 0) {
          myVault.bankCards.forEach((bankCard) => {
            bankCard.name = cipher.decrypt(bankCard.name);
            bankCard.cardNumber = cipher.decrypt(bankCard.cardNumber);
            bankCard.holderName = cipher.decrypt(bankCard.holderName);
            bankCard.expiry = cipher.decrypt(bankCard.expiry);
            bankCard.cvv = cipher.decrypt(bankCard.cvv);
          });
        }
      });

      res.render("vault/general", {
        title: "Stone Wall",
        type: "All",
        // user: req.user,
        myVault,
        styles: css,
      });
    });
  } catch (error) {
    console.log(error);
  }
});
// Website page backup
// router.get("/websites", ensureAuthenticated, async (req, res, next) => {
//   try {
//     var css = [
//       {
//         uri: "../css/sidebar.css",
//       },
//       {
//         uri: "https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css",
//       },
//       {
//         uri: "../clipboard",
//       },
//     ];

//     res.render("vault/general", {
//       title: "MyVault - Websites",
//       type: "Websites",
//       // user: req.user,
//       styles: css,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

// Wesite page
router.get("/websites", ensureAuthenticated, async (req, res, next) => {
  try {
    Vault.find({ user: req.user._id }, (err, myVault) => {
      var css = [
        {
          uri: "../css/sidebar.css",
        },
        {
          uri: "https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css",
        },
        {
          uri: "../clipboard",
        },
      ];

      // //Decrypt
      // myVault.websites.forEach((website) => {
      // website.name = cipher.decrypt(website.name)
      // website.url = cipher.decrypt(website.url)
      // website.email = cipher.decrypt(website.email)
      // website.password = cipher.decrypt(website.password)
      // })

      myVault.forEach((myVault) => {
        if (myVault.websites.length > 0) {
          myVault.websites.forEach((website) => {
            website.name = cipher.decrypt(website.name);
            website.url = cipher.decrypt(website.url);
            website.email = cipher.decrypt(website.email);
            website.password = cipher.decrypt(website.password);
          });
        }
      });

      res.render("vault/general", {
        title: "Stone Wall - Websites",
        type: "Websites",
        myVault,
        styles: css,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

// Application page
router.get("/applications", ensureAuthenticated, (req, res, next) => {
  try {
    Vault.find({ user: req.user._id }, (err, myVault) => {
      var css = [
        {
          uri: "../css/sidebar.css",
        },
        {
          uri: "https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css",
        },
        {
          uri: "../clipboard",
        },
      ];

      //Decrypt
      // myVault.applications.forEach((application) => {
      //   application.name = cipher.decrypt(application.name)
      //   application.device = cipher.decrypt(application.device)
      //   application.email = cipher.decrypt(application.email)
      //   application.password = cipher.decrypt(application.password)
      // })

      myVault.forEach((myVault) => {
        if (myVault.applications.length > 0) {
          myVault.applications.forEach((application) => {
            application.name = cipher.decrypt(application.name);
            application.device = cipher.decrypt(application.device);
            application.email = cipher.decrypt(application.email);
            application.password = cipher.decrypt(application.password);
          });
        }
      });

      res.render("vault/general", {
        title: "Stone Wall - Application",
        type: "Applications",
        // user: req.user,
        myVault,
        styles: css,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

// Bank Card page
router.get("/bank-cards", ensureAuthenticated, (req, res, next) => {
  try {
    Vault.find({ user: req.user._id }, (err, myVault) => {
      var css = [
        {
          uri: "../css/sidebar.css",
        },
        {
          uri: "https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css",
        },
        {
          uri: "../clipboard",
        },
      ];

      // //Decrypt
      // myVault.bankCards.forEach((bankCard) => {
      // bankCard.name = cipher.decrypt(bankCard.name)
      // bankCard.cardNumber = cipher.decrypt(bankCard.cardNumber)
      // bankCard.holderName = cipher.decrypt(bankCard.holderName)
      // bankCard.expiry = cipher.decrypt(bankCard.expiry)
      // bankCard.cvv = cipher.decrypt(bankCard.cvv)
      // })

      myVault.forEach((myVault) => {
        if (myVault.bankCards.length > 0) {
          myVault.bankCards.forEach((bankCard) => {
            bankCard.name = cipher.decrypt(bankCard.name);
            bankCard.cardNumber = cipher.decrypt(bankCard.cardNumber);
            bankCard.holderName = cipher.decrypt(bankCard.holderName);
            bankCard.expiry = cipher.decrypt(bankCard.expiry);
            bankCard.cvv = cipher.decrypt(bankCard.cvv);
          });
          console.log(myVault);
        }
      });

      res.render("vault/general", {
        title: "Stone Wall - Bank Card",
        type: "Bank-Cards",
        // user: req.user,
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
  "/password-generator",
  ensureAuthenticated,
  async (req, res, next) => {
    try {
      var css = [
        {
          uri: "../css/sidebar.css",
        },
        {
          uri: "https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css",
        },
        {
          uri: "../clipboard",
        },
      ];

      res.render("vault/passwordGenerator", {
        title: "Stone Wall - Password Generator",
        styles: css,
        type: "none",
      });
    } catch (error) {
      console.log(error);
    }
  }
);

// // All Post methods
/* POST add website modal user page. */
router.post("/websites", async (req, res) => {
  const { addWebsiteName, addWebsiteUrl, addWebsiteEmail, addWebsitePassword } =
    req.body;

  const newWebsite = new Website({
    name: cipher.encrypt(addWebsiteName),
    url: cipher.encrypt(addWebsiteUrl),
    email: cipher.encrypt(addWebsiteEmail),
    password: cipher.encrypt(addWebsitePassword),
  });

  await Vault.findOneAndUpdate(
    {
      user: req.user._id,
    },
    {
      $push: {
        websites: newWebsite,
      },
    }
  );

  res.redirect("websites");
});

/* POST add application modal user page. */
router.post("/applications", async (req, res) => {
  const {
    addApplicationName,
    addApplicationDevice,
    addApplicationEmail,
    addApplicationPassword,
  } = req.body;

  const newApplication = new Application({
    name: cipher.encrypt(addApplicationName),
    device: cipher.encrypt(addApplicationDevice),
    email: cipher.encrypt(addApplicationEmail),
    password: cipher.encrypt(addApplicationPassword),
  });

  console.log(newApplication);
  await Vault.findOneAndUpdate(
    {
      user: req.user._id,
    },
    {
      $push: {
        applications: newApplication,
      },
    }
  );

  res.redirect("applications");
});

/* POST add bank card modal user page. */
router.post("/bank-cards", async (req, res) => {
  const {
    addBankCardName,
    addBankCardCardNumber,
    addBankCardHolderName,
    addBankCardExpiry,
    addBankCardCVV,
  } = req.body;

  const newBankCard = new BankCard({
    name: cipher.encrypt(addBankCardName),
    cardNumber: cipher.encrypt(addBankCardCardNumber),
    holderName: cipher.encrypt(addBankCardHolderName),
    expiry: cipher.encrypt(addBankCardExpiry),
    cvv: cipher.encrypt(addBankCardCVV),
  });

  await Vault.findOneAndUpdate(
    {
      user: req.user._id,
    },
    {
      $push: {
        bankCards: newBankCard,
      },
    }
  );

  res.redirect("bank-cards");
});

// POST edit Website
router.post("/websites/edit/:id", async (req, res) => {
  const {
    editWebsiteName,
    editWebsiteUrl,
    editWebsiteEmail,
    editWebsitePassword,
  } = req.body;
  const id = req.params.id;

  const result = await Vault.updateOne(
    {
      websites: {
        $elemMatch: { _id: id },
      },
    },
    {
      $set: {
        "websites.$.name": cipher.encrypt(editWebsiteName),
        "websites.$.url": cipher.encrypt(editWebsiteUrl),
        "websites.$.email": cipher.encrypt(editWebsiteEmail),
        "websites.$.password": cipher.encrypt(editWebsitePassword),
      },
    }
  );
  res.redirect("../../websites");
});

// POST edit Application
router.post("/applications/edit/:id", async (req, res) => {
  const {
    editApplicationName,
    editApplicationDevice,
    editApplicationEmail,
    editApplicationPassword,
  } = req.body;
  const id = req.params.id;

  const result = await Vault.updateOne(
    {
      applications: {
        $elemMatch: { _id: id },
      },
    },
    {
      $set: {
        "applications.$.name": cipher.encrypt(editApplicationName),
        "applications.$.device": cipher.encrypt(editApplicationDevice),
        "applications.$.email": cipher.encrypt(editApplicationEmail),
        "applications.$.password": cipher.encrypt(editApplicationPassword),
      },
    }
  );
  res.redirect("../../applications");
});

// POST edit Application
router.post("/bank-cards/edit/:id", async (req, res) => {
  const {
    editBankCardName,
    editBankCardCardNumber,
    editBankCardHolderName,
    editBankCardExpiry,
    editBankCardCVV,
  } = req.body;
  const id = req.params.id;

  const result = await Vault.updateOne(
    {
      bankCards: {
        $elemMatch: { _id: id },
      },
    },
    {
      $set: {
        "bankCards.$.name": cipher.encrypt(editBankCardName),
        "bankCards.$.cardNumber": cipher.encrypt(editBankCardCardNumber),
        "bankCards.$.holderName": cipher.encrypt(editBankCardHolderName),
        "bankCards.$.expiry": cipher.encrypt(editBankCardExpiry),
        "bankCards.$.cvv": cipher.encrypt(editBankCardCVV),
      },
    }
  );
  res.redirect("../../bank-cards");
});

// Delete Req
// POST edit Website
router.get("/websites/delete/:id", async (req, res) => {
  const id = req.params.id;

  const result = await Vault.updateOne(
    {
      websites: {
        $elemMatch: { _id: id },
      },
    },
    {
      $pull: {
        websites: {
          _id: id,
        },
      },
    }
  );
  res.redirect("../../websites");
});

// POST edit Application
router.get("/applications/delete/:id", async (req, res) => {
  const id = req.params.id;

  const result = await Vault.updateOne(
    {
      applications: {
        $elemMatch: { _id: id },
      },
    },
    {
      $pull: {
        applications: {
          _id: id,
        },
      },
    }
  );
  res.redirect("../../applications");
});

// POST edit Application
router.get("/bank-cards/delete/:id", async (req, res) => {
  const id = req.params.id;

  const result = await Vault.updateOne(
    {
      bankCards: {
        $elemMatch: { _id: id },
      },
    },
    {
      $pull: {
        bankCards: {
          _id: id,
        },
      },
    }
  );
  res.redirect("../../bank-cards");
});
module.exports = router;
