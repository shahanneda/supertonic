import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react'
import { RootStackParamList } from '../rootStackParamList';
import * as DocumentPicker from 'expo-document-picker';
import { Button } from 'react-native';
import { SheetMusicService, UserService } from '../../generated';
import { useAuthentication } from '../hooks/useAuthentication';
type Props = {}

export default function Upload({ }: Props) {
	const navigator = useNavigation<NavigationProp<RootStackParamList>>();
	const auth = useAuthentication();

	async function submitFile(file: File) {
		SheetMusicService.upload({file: file, randomString: "hello"});
	}

	return (
		<div>
			<Button onPress={async () => {
				console.log("before")
				const result = await DocumentPicker.getDocumentAsync({
					type: "application/pdf"
				})

				// For somereason, typescript does not see the second part of the result, which is a union type
				//@ts-ignore
				if (result.file) {
					//@ts-ignore
					submitFile(result.file);
				}
			}}
				title="Upload"
			/>
		</div>
	)
}