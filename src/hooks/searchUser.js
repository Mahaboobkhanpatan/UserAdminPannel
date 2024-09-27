function searchUser(searchText, data) {
	return data.filter(item => {
	  for (let key in item) {
		if (item[key] &&item[key].toString().toLowerCase().includes(searchText.toLowerCase())) {
		  return true;
		}
	  }
	  return false;
	});
  }
  
  export default searchUser;