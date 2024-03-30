import Aluno from '../models/Aluno';

class HomeController {
  // eslint-disable-next-line class-methods-use-this
  async index(req, res) {
    res.json('Index');
  }
}

export default new HomeController();
