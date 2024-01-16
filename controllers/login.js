const User = require('../models/User');
exports.logIn = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    console.log(email);
    const exUser = await User.findOne({ email: email });
    console.log(exUser);
    if (!exUser) {
      return res.status(501).json({
        success: false,
        message: "No user exists!!",
        m: exUser
      });
    }
    if (exUser.password !== password) {
      return res.status(501).json({
        success: false,
        message: "Incorrect password entered!!",
      });
    }
    if (email === "yashkalra2013@gmail.com") {
      req.session.isAdmin = true;
    } else {
      req.session.isAdmin = false;
    }
    req.session.user = exUser;
    req.session.logged = true;
    res.redirect('/home');
  } catch (e) {
    res.status(200).json({
      success: false,
      message: "Failed in logging!!",
      m: e.message
    });
  }
};
