const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04ba8ee4c7d172e67637c5239a5f4ecc08d1e82d89387b619bfcf0b5e30263147e454d14bbea8d4fd10a16458496306d81fc6fb6e0ce8a10742c7f0ea9e06dcaec": 100,
  //72d5e1aeadd3b348c6e4856d68a8715e042d20957e62772a38bf4e6fe4bd75bc
  "04334473226d25e24770336867bc1ad04b54de34cda6fa0e7e6b5d093b680300f08e3a00ae6e566ea86f71ffc7d1459b66eba85d34fdc9286fa42ffb64aa0d9d5f": 50,
  //e40d612c34c1acf45fd7ae30452e5f9fae2087e4020c39df8816529466af07a0
  "04d13d7304c471be3c1d2c18a79806db70af87fa207a1458767d33ae733324a7e0ec0687a1d903c13902e29d93596d17551e744c54f5e66aa864f628d03c16fdfb": 75,
  //54b73cd2c6312a993496d5e3bb6a5a9a1f53895dd21160b3bf9af937992380e1
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
