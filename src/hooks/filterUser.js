function filterUser(key, value, data) {
	return data.filter(
	  item => {
		return item[key].toString().toLowerCase() === value.toString().toLowerCase();
	  }
	)
  }
  
  export default filterUser;