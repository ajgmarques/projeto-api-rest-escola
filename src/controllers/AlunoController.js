import Aluno from '../models/Aluno';
import Photo from '../models/Photo';

class AlunoController {
  // eslint-disable-next-line class-methods-use-this
  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
      include: {
        model: Photo,
        attributes: ['originalname', 'filename', 'url'],
      },
    });
    res.json(alunos);
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID'],
        });
      }
      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
          attributes: ['originalname', 'filename', 'url'],
        },
      });

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async store(req, res) {
    try {
      const novoAluno = await Aluno.create(req.body);
      const {
        id, nome, sobrenome, email,
      } = novoAluno;
      return res.json({
        id, nome, sobrenome, email,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      if (!req.params) {
        return res.status(400).json({
          errors: ['Missing ID'],
        });
      }
      const aluno = await Aluno.findByPk(req.params.id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }
      const novosDados = await aluno.update(req.body);
      const {
        id, nome, sobrenome, email,
      } = novosDados;
      return res.json({
        id, nome, sobrenome, email,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params) {
        return res.status(400).json({
          errors: ['Missing ID'],
        });
      }
      const aluno = await Aluno.findByPk(req.params.id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }
      await aluno.destroy();

      return res.json({
        eliminado: true,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new AlunoController();
