import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';
import { Category, Recording } from 'src/entities';

const _digestUrl = async (_string: string) => {
  const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, _string);
  return digest;
};

const _downloadAudi = async (uri: string, local: string) => {
  const downloadResumable = FileSystem.createDownloadResumable(uri, local, {});

  try {
    await downloadResumable.downloadAsync();
    // Finished downloading
  } catch (e) {}
};

const _deleteCachedURI = async (uri: string) => {
  if (uri) {
    // 'deleting old uri
    let _tmp = await FileSystem.getInfoAsync(uri);
    if (_tmp) await FileSystem.deleteAsync(uri);
  }
};

const _checkAndDownload = async (uri: string) => {
  const localURI = await _digestUrl(uri);
  const _filename = FileSystem.documentDirectory + localURI + '.m4a';

  let _tmp = await FileSystem.getInfoAsync(_filename);

  if (_tmp.exists) {
    // URL downloaded previously
  } else {
    // Downloading
    await _downloadAudi(uri, _filename);
    _tmp = await FileSystem.getInfoAsync(_filename);
  }

  return _tmp;
};

export const cacheNewVoice = async (category: Recording, oldVoice: string) => {
  return new Promise(async (resolve, _) => {
    if (oldVoice != null) await _deleteCachedURI(oldVoice);

    const localFile = await _checkAndDownload(category.voiceURL);

    let _category = { ...category, voiceURL: localFile };

    resolve(_category);
  });
};

export const cacheCategoryVoices = async (category: Category[]) => {
  return new Promise(async (resolve, _) => {
    console.log("===category===", category)
    // removing null voices
    let voices = category.filter(voice => voice.voiceURL !== null);

    // return category if all voices are null
    if (voices.length === 0) resolve(category);

    let voicesDownloaded: any[] = [];
    console.log("===voices===", voices)
    const promises = voices.map(async v => {
      let localFile = await _checkAndDownload(v.voiceURL);

      return {
        ...v,
        voiceURL: localFile,
      };
    });

    voicesDownloaded = await Promise.all(promises);

    let payload = category.map(voice => {
      const downloaded = voicesDownloaded.find(d => d._id === voice._id);
      return downloaded ? downloaded : voice;
    });

    resolve(payload);
  });
};

export const cacheStudentCategoryVoices = async (category: any) => {
  return new Promise(async (resolve, _) => {
    let voicesDownloaded = [];

    const promises = category.children.map(async (v: any) => {
      let parentLocalFile = await _checkAndDownload(v.voiceURL);

      let studentLocalFile = null;
      if (v.studentVoiceURL != null) {
        studentLocalFile = await _checkAndDownload(v.studentVoiceURL);
      }
      return {
        ...v,
        voiceURL: parentLocalFile,
        studentVoiceURL: studentLocalFile,
      };
    });

    voicesDownloaded = await Promise.all(promises);

    let payload = category;
    payload.children = voicesDownloaded;

    resolve(payload);
  });
};
