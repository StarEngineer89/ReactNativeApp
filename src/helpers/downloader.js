import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';

const _digestUrl = async (_string) => {
  const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, _string);
  return digest;
};

const _downloadAudi = async (uri, local) => {
  const downloadResumable = FileSystem.createDownloadResumable(uri, local, {});

  try {
    const { uri } = await downloadResumable.downloadAsync();
    // Finished downloading
  } catch (e) {}
};

const _deleteCachedURI = async ({ uri }) => {
  if (uri) {
    // 'deleting old uri
    let _tmp = await FileSystem.getInfoAsync(uri);
    if (_tmp) await FileSystem.deleteAsync(uri);
  }
};

const _checkAndDownload = async (uri) => {
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

export const cacheNewVoice = async (category, oldVoice) => {
  return new Promise(async (resolve, reject) => {
    if (oldVoice != null) await _deleteCachedURI(oldVoice);

    const localFile = await _checkAndDownload(category.voiceURL);

    let _category = { ...category, voiceURL: localFile };

    resolve(_category);
  });
};

export const cacheStudentNewVoice = async (category, oldVoice) => {
  return new Promise(async (resolve, reject) => {
    if (oldVoice != null) await _deleteCachedURI(oldVoice);
    const localFile = await _checkAndDownload(category.studentVoiceURL);

    let _category = { ...category, studentVoiceURL: localFile };

    resolve(_category);
  });
};

export const cacheCategoryVoices = async (category) => {
  return new Promise(async (resolve, reject) => {
    // removing null voices
    let voices = category.filter((voice) => voice.voiceURL !== null);

    // return category if all voices are null
    if (voices.length === 0) resolve(category);

    let voicesDownloaded = [];

    const promises = voices.map(async (v) => {
      let localFile = await _checkAndDownload(v.voiceURL);

      return {
        ...v,
        voiceURL: localFile,
      };
    });

    voicesDownloaded = await Promise.all(promises);

    let payload = category.map((voice) => {
      const downloaded = voicesDownloaded.find((d) => d._id === voice._id);
      return downloaded ? downloaded : voice;
    });

    resolve(payload);
  });
};

export const cacheStudentCategoryVoices = async (category) => {
  return new Promise(async (resolve, reject) => {
    let voicesDownloaded = [];

    const promises = category.children.map(async (v) => {
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
