import app from './app';

const PORT = 3001;
app.listen(PORT, () => {
  console.log();
  console.log(`Escutando na porta ${PORT}`);
  console.log(`CTRL + clique em http://127.0.0.1:${PORT}`);
});
