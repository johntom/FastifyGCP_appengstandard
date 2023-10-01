 

function page() {  
    
var grid = new Grid({
    columns: [{
       id: 'name', 
       name: 'Name'
    }, { 
       id: 'email',
       name: 'Email'
    }, {
       id: 'phoneNumber',
       name: 'Phone Number'
    }],
    data: [
      { name: 'John', email: 'john@example.com', phoneNumber: '(353) 01 222 3333' },
      { name: 'Mark', email: 'mark@gmail.com', phoneNumber: '(01) 22 888 4444' },
    ]
  });
           
}         