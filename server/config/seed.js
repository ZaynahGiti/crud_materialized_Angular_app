/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';

var Employee = sqldb.Employee;


User.sync()
.then(()=>User.find().then((data,err) => {
  if(!data){
    User.destroy({ where: {} })
      .then(() => {
        User.bulkCreate([{
          provider: 'local',
          name: 'Test User',
          email: 'zeina.sadal.deen@gmail.com',
          password: 'Ada@109'
        }, {
          provider: 'local',
          role: 'admin',
          name: 'Admin',
          email: 'zeina.saad.addin@hotmail.com',
          password: 'Ada@109'
        }])
        .then(() => {
          console.log('finished populating users');
        })
      })
  }
}))

Employee.sync()
.then(()=>Employee.find().then((data,err) => {
  if(!data){
    Employee.destroy({ where: {} })
      .then(() => {
    Employee.bulkCreate(
      [
        {name: 'TEST1', department: 'IT', experience: '1', birthDate: '1991-08-06', experience: '1' },
        {name: 'TEST2', department: 'PM', experience: '2', birthDate: '1991-04-18', experience: '2' },
        {name: 'TEST3', department: 'IT', experience: '3', birthDate: '1991-11-12', experience: '3' },
        {name: 'TEST4', department: 'PM', experience: '4', birthDate: '1991-05-26', experience:'4' },
        {name: 'TEST5', department: 'IT', experience: '5', birthDate: '1990-08-01.', experience: '5' }
      ])
      .then(() => {
        console.log('finished populating employees');
      })
    })
}
}))

    

    

