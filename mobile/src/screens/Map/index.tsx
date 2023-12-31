import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { CheckIn } from './CheckIn';
import Discovery from './Discovery';
import { Place, User } from './markers';
import { showDetailPlaceModal } from './PlaceModal';
import Search from './Search';

import type { PlaceData } from '@/types';
import { useAuth } from '@/utils/auth';
import { inspectCheckInCount, useLocation, usePlaces } from '@/utils/map';

export const Map = () => {
	const { user } = useAuth();
	const { region } = useLocation();
	const { places } = usePlaces();
	const { top } = useSafeAreaInsets();
	const currentPlace = places.find((ele) => ele.real);
	const navigation = useNavigation();
	const searchBarStyle = { ...styles.searchBar, top };

	const handlePressPlace = (place: PlaceData) => {
		showDetailPlaceModal(place);
	};

	const handlePressDiscovery = () => {
		navigation.navigate('Discovery' as never);
	};

	const handlePressCheckIn = () => {
		navigation.navigate('Checkin' as never);
	};

	return (
		<View style={styles.container}>
			<MapView
				style={styles.mapContainer}
				initialRegion={region}
				region={region}
			>
				{places.map((p) => {
					const { color, value } = inspectCheckInCount(p);
					const handlePress = () => handlePressPlace(p);
					return (
						<Place
							id={p.id}
							key={p.id}
							title={p.name}
							location={p.location}
							image={{ uri: p.imageUrl }}
							tagText={value}
							tagColor={color}
							onPress={handlePress}
						/>
					);
				})}
				<User location={region} imageUrl={user?.photoURL as string} />
			</MapView>
			<View style={searchBarStyle}>
				<Search />
			</View>

			{currentPlace ? (
				<CheckIn
					style={styles.bottomView}
					place={currentPlace}
					onPressPlace={handlePressPlace}
					onPressCheckIn={handlePressCheckIn}
				/>
			) : (
				<Discovery style={styles.bottomView} onPress={handlePressDiscovery} />
			)}
		</View>
	);
};

export default Map;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	searchBar: {
		position: 'absolute',
		left: 0,
		right: 0,
		paddingHorizontal: 14,
	},
	mapContainer: {
		flex: 1,
	},
	bottomView: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 14,
		paddingTop: 16,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		shadowOffset: {
			height: -1,
			width: 0,
		},
		shadowOpacity: 0.2,
	},
});
