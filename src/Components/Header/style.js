import { StyleSheet } from 'react-native'

export const headerStyle = StyleSheet.create({
	header: {
		backgroundColor: '#fff',
		elevation: 0,
	},
	bottomHeader: {
		height: 60,
		width: '100%',
		backgroundColor: '#4a148c',
		justifyContent: 'center',
		alignSelf: 'center',
	},
	bottomHeaderButon: {
		height: 40,
		width: '90%',
		backgroundColor: 'white',
		elevation: 0,
		alignSelf: 'center',
		borderRadius: 5,
		marginBottom: 10,
	},
	headerTitle: {
		fontSize: 26,
		marginLeft: 8,
		color: '#11171E',
		fontWeight: 'bold',
	},
})
