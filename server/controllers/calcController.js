const sequelize        = require('../config/db')
const createCalcModel  = require('../models/calcModel');
const Calc             = createCalcModel(sequelize,sequelize.Sequelize.DataTypes);


const calcController = {
    async create(req, res) {
        try {
            const calc  = await Calc.create(req.body);
            
            return res.status(201).json(calc);
        } catch (error) {
            console.error(req);
            return res.status(400).json(
                { error: 'Failed to create the equation', details: error.message });
        }
    },

    async listAll(req, res) {
        try {
            const calc = await Calc.findAll();
            return  res.status(200).json(calc);
        } catch (error) {
            console.error(error);
            return res.status(500).json(
                { message: 'Error retrieving equations', error });
        }
    },

    async findById(req, res) {
        try {
            const calc = await Calc.findByPk(req.params.id);
            if (calc) {
                return res.status(200).json(calc);
            } else {
                return res.status(404).json(
                    { message: 'equation not found' });
            }
        } catch (error) {
            return res.status(500).json(
                { message: 'Error retrieving equation', error });
        }
    },

    
    async update(req, res) {
        try {
            const updatedCalc = await Calc.update(req.body, {
                where: { id: req.params.id },
            });
            if (updatedCalc[0]) {
                return res.status(200).json(
                    { message: 'Equation updated successfully' });
            } else {
                console.log(updatedCalc[0])
                return res.status(404).json(
                    { message: 'Equation not found' });
            }
        } catch (error) {
            return res.status(500).json(
                 { message: 'Error updating equation', error });
        }
    },

   async delete(req, res) {
        try {
            const deletedCalc = await Calc.destroy({ where: { id: req.params.id } });
            if (deletedCalc) {
                res.status(204).json({ message: 'Equation deleted successfully' });
            } else {
                res.status(404).json({ message: 'Equation not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting equation', error });
        }
    }

};

module.exports = calcController;