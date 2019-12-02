import { StyleSheet } from 'react-native'

export const headerStyle = StyleSheet.create({
	header: {
		backgroundColor: '#4a148c',
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
		flexDirection: 'row',
		alignItems: 'center',
		height: 38,
		width: '90%',
		backgroundColor: 'white',
		elevation: 0,
		alignSelf: 'center',
		borderRadius: 5,
		marginBottom: 10,
	},
	headerTitle: {
		marginLeft: 8,
		color: 'white',
		fontFamily: 'Poppins-Bold',
	},
})
