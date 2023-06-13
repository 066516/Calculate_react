const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'firstdb',
    password: '20032003',
    port: 5432, 
  });
  var table_name='etudiant'
  var commend;
  commend='SELECT * FROM public.'+table_name
  pool.query(commend, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results.rows[1]);
  });
//   pool.query(' INSERT INTO public.etudiant(	id, matricule) VALUES (7, 2121);', (error ) => {
//     if (error) {
//       throw error;
//     }
//     console.log('rows insterted');
//   });
//   pool.query(' drop table emp', (error ) => {
//     if (error) {
//       throw error;
//     }
//     console.log(' deleted');
//   });
  
  