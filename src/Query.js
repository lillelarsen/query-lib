const db = require('../mysql')();
const { extrapolate } = require('../helper');

class Query {
    constructor(table) {
        this.table = table;
        return this; // sørger for at vi kan bruge metoder på vores class objekter
    }
    // ============== CREATE ===============
    create(data) {
        // keys.join sætter de valgte keys ind på denne måde "image = ?"
        const { keys, values } = extrapolate(data);
        this.SQL = `INSERT INTO ${this.table} SET ${keys.join(', ')}`;
        this.values = values;
        return this;
    }

    // ============== FIND (SELECT) ===============
    find(data = { 1: 1 }) { // { 1: 1 } Viser alt, hvis der ikke står noget
        const { keys, values } = extrapolate(data);
        this.SQL = `SELECT * FROM ${this.table} WHERE ${keys.join(' AND ')}`;
        this.values = values
        return this;
    }

    findOne(data = { 1: 1 }) {
        const { keys, values } = extrapolate(data);
        this.SQL = `SELECT * FROM ${this.table} WHERE ${keys.join(' AND ')} LIMIT 1`;
        this.values = values
        return this;
    }

    findById(id) { 
        this.SQL = `SELECT * FROM ${this.table} WHERE id = ${id}`;
        return this;
    }

    // ============== UPDATE ===============
    findAndUpdate(criteria, data) {
        const setData = extrapolate(data);
        const setCriteria = extrapolate(criteria);
        this.SQL = `UPDATE ${this.table} SET ${setData.keys.join(', ')} WHERE ${setCriteria.keys.join(' AND ')}`;
        this.values = [...setData.values, ...setCriteria.values]; // ... Spreadoperators
        return this;
    }

    findOneAndUpdate(criteria, data) {
        const setData = extrapolate(data);
        const setCriteria = extrapolate(criteria);
        this.SQL = `UPDATE ${this.table} SET ${setData.keys.join(', ')} WHERE ${setCriteria.keys.join(' AND ')} LIMIT 1`;
        this.values = [...setData.values, ...setCriteria.values]; 
        return this;
    }

    findByIdAndUpdate(id, data) {
        const { keys, values } = extrapolate(data);
        this.SQL = `UPDATE ${this.table} SET ${keys.join(', ')} WHERE id = ${id}`;
        this.values = values
        return this;
    }

    // ============== DELETE ===============
    findAndDelete(data) {
        const { keys, values } = extrapolate(data);
        this.SQL = `DELETE FROM ${this.table} WHERE ${keys.join(' AND ')}`;
        this.values = values
        return this;
    }

    findOneAndDelete(data) {
        const { keys, values } = extrapolate(data);
        this.SQL = `DELETE FROM ${this.table} WHERE ${keys.join(' AND ')} LIMIT 1`;
        this.values = values
        return this;
    }

    FindByIdAndDelete(id) {
        this.SQL = `DELETE FROM ${this.table} WHERE id = ${id}`;
        return this;
    }

    // ============== EXECUTION OF SQL ===============
    execute() {
        const superThis = this;
        return new Promise(function(resolve, reject) {
            try {
                db.query(superThis.SQL, superThis.values, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = Query; // Vores class