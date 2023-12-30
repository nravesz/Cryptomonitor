import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rulesController from './src/controllers/rules_controller';
import { authController } from './src/controllers/auth_controller';
import currenciesController from './src/controllers/currencies_controller';
import monitoredCurrenciesController from './src/controllers/monitored_currencies_controller';
import walletController from './src/controllers/wallet_controller';
import variablesController from './src/controllers/variables_controller';

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT;

app.use(cors());


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.use('/auth', authController);
app.use('/rules', rulesController);
app.use('/currencies', currenciesController);
app.use('/monitored-currencies', monitoredCurrenciesController);
app.use('/wallet', walletController);
app.use('/variables', variablesController);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})