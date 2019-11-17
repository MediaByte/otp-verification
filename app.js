const express = require('express');

const { generateOTP, verifyOTP } = require('./src/otp');

const app = express();

const port = process.env.PORT || 3005;
app.listen(port, () => console.warn(`Server running on localhost:${port}`));

app.get('/generate', async (req, res) => {
  try {
    const isValid = await generateOTP(req.query.mobileNo);
    res.json({
      isError: false,
      isValid,
    });
  } catch (err) {
    console.error(err.message);
    res.json({
      isError: true,
    });
  }
});

app.get('/verify', async (req, res) => {
  try {
    const { mobileNo, otp, hash } = req.query;
    const isVerified = await verifyOTP({ mobileNo, otp, hash });
    res.json({
      isError: false,
      verified: isVerified,
    });
  } catch (err) {
    console.error(err.message);
    res.json({
      isError: true,
    });
  }
});
