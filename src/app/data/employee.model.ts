export class EmployeeModel
{
	employeeListNumber: string = '';
      firstname: string = '';
      lastname: string = '';
      emailaddress: string = '';
      contactno: string = '';
      address: string = '';
      username: string = '';
      userpassword: string = '';
      gender: string = '';
      qualification: string = '';
      experience: string = '';
      language: string = '';
      id: number = 0;
}

export function create_UUID()
{
	var dt = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c){
	var r = (dt + Math.random() * 16) % 16 | 0;
	dt = Math.floor(dt / 16);
	return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	
	return uuid;
}