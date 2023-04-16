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
		const user = await UserService.getUser();
		const formData = new FormData();
		formData.append('file', file);


		// 	console.log("GOT USER HERE", user)
			console.log(file)
		// let res = await fetch("http://localhost:3000/sheet-music/sheet-music/upload", { method: "POST", body: formData, headers: new Headers({ 'Authorization': `Bearer ${auth}` }) })
		// const fileany = new Blob(file);
		// application/x-www-form-urlencoded
		let res = SheetMusicService.upload({file: file});
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