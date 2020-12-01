const fs = require('fs-extra');  
const path = require('path'); 
const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM fotos', (err, fotos) => {
     if (err) {
      res.json('Error');
     }
      res.json(fotos);
    });
  });
};




controller.save = (req, res) => {
  var n = /\\/gi;
  console.log(typeof  req.file);
  const ruta = req.file.path.replace(n,'/');
  const data = {
    descripcion : req.body.descripcion,
    ruta: ruta,
    nombre: req.body.nombre
  };
  req.getConnection((err, connection) => {
    connection.query('INSERT INTO fotos set ?', data, (err, foto) => {
        if (err) {
            res.json('Error');
           }
            res.json('Se guardo con exito');
    })
  })
};

function delete_query  (req, res) {
    const { id } = req.params;
    req.getConnection((err, connection) => {
      connection.query('DELETE FROM fotos WHERE id = ?', [id]);
    });
}

controller.delete = (req,res) => {
  const { id } = req.params;
    req.getConnection((err, connection) => {
      connection.query('SELECT * FROM fotos WHERE id = ?', [id], (err, rows) => {
          if (err){res.json('Error');}
          fs.remove('./'+rows[0].ruta);
          delete_query(req,res);
          res.json('Se elimino con exito');
      });
    });
}

module.exports = controller;
