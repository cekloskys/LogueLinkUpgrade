import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  page: {
    padding: 10,
    flex: 1,
    height: 'auto',
    backgroundColor: 'white',
  },
  dropdownBtnStyle: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CFD2CF',
    backgroundColor: '#CFD2CF',
    marginTop: 10,
    marginBottom: 5,
  },
  dropdownBtnTxtStyle: {
    color: 'white',
    textAlign: 'left',
  },
  dropdownDropdownStyle: {
    borderRadius: 5,
  },
  dropdownRowStyle: {
    backgroundColor: '#EFEFEF',
  },
  dropdownRowTxtStyle: {
    color: '#000',
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#CFD2CF',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  studentname: {
    fontsize: 16,
    marginBottom: 15,
    borderBottomWidth: 1.0,
    color: 'black',
    borderColor: 'black',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    color: 'black',
    height: 50,
    backgroundColor: 'white',
    padding: 5,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#CFD2CF',
    borderRadius: 5,
    fontSize: 16,
    paddingLeft: 10,
  },
});

export default styles;