import React, { useState } from 'react';
import { View } from 'react-native';
import { Card, Menu, Text, Button, Appbar, TextInput, Divider, PaperProvider, ActivityIndicator, MD2Colors } from 'react-native-paper';

// Language map
const languages = {
    'af': 'Afrikaans',
    'sq': 'Albanian',
    'am': 'Amharic',
    'ar': 'Arabic',
    'hy': 'Armenian',
    'az': 'Azerbaijani',
    'eu': 'Basque',
    'be': 'Belarusian',
    'bn': 'Bengali',
    'bs': 'Bosnian',
    'bg': 'Bulgarian',
    'ca': 'Catalan',
    'ceb': 'Cebuano',
    'ny': 'Chichewa',
    'zh-cn': 'Chinese (Simplified)',
    'zh-tw': 'Chinese (Traditional)',
    'co': 'Corsican',
    'hr': 'Croatian',
    'cs': 'Czech',
    'da': 'Danish',
    'nl': 'Dutch',
    'en': 'English',
    'eo': 'Esperanto',
    'et': 'Estonian',
    'tl': 'Filipino',
    'fi': 'Finnish',
    'fr': 'French',
    'fy': 'Frisian',
    'gl': 'Galician',
    'ka': 'Georgian',
    'de': 'German',
    'el': 'Greek',
    'gu': 'Gujarati',
    'ht': 'Haitian Creole',
    'ha': 'Hausa',
    'haw': 'Hawaiian',
    'iw': 'Hebrew',
    'he': 'Hebrew',
    'hi': 'Hindi',
    'hmn': 'Hmong',
    'hu': 'Hungarian',
    'is': 'Icelandic',
    'ig': 'Igbo',
    'id': 'Indonesian',
    'ga': 'Irish',
    'it': 'Italian',
    'ja': 'Japanese',
    'jw': 'Javanese',
    'kn': 'Kannada',
    'kk': 'Kazakh',
    'km': 'Khmer',
    'ko': 'Korean',
    'ku': 'Kurdish (Kurmanji)',
    'ky': 'Kyrgyz',
    'lo': 'Lao',
    'la': 'Latin',
    'lv': 'Latvian',
    'lt': 'Lithuanian',
    'lb': 'Luxembourgish',
    'mk': 'Macedonian',
    'mg': 'Malagasy',
    'ms': 'Malay',
    'ml': 'Malayalam',
    'mt': 'Maltese',
    'mi': 'Maori',
    'mr': 'Marathi',
    'mn': 'Mongolian',
    'my': 'Myanmar (Burmese)',
    'ne': 'Nepali',
    'no': 'Norwegian',
    'or': 'Odia',
    'ps': 'Pashto',
    'fa': 'Persian',
    'pl': 'Polish',
    'pt': 'Portuguese',
    'pa': 'Punjabi',
    'ro': 'Romanian',
    'ru': 'Russian',
    'sm': 'Samoan',
    'gd': 'Scots Gaelic',
    'sr': 'Serbian',
    'st': 'Sesotho',
    'sn': 'Shona',
    'sd': 'Sindhi',
    'si': 'Sinhala',
    'sk': 'Slovak',
    'sl': 'Slovenian',
    'so': 'Somali',
    'es': 'Spanish',
    'su': 'Sundanese',
    'sw': 'Swahili',
    'sv': 'Swedish',
    'tg': 'Tajik',
    'ta': 'Tamil',
    'te': 'Telugu',
    'th': 'Thai',
    'tr': 'Turkish',
    'uk': 'Ukrainian',
    'ur': 'Urdu',
    'ug': 'Uyghur',
    'uz': 'Uzbek',
    'vi': 'Vietnamese',
    'cy': 'Welsh',
    'xh': 'Xhosa',
    'yi': 'Yiddish',
    'yo': 'Yoruba',
    'zu': 'Zulu',
};

const Home = () => {
    const [text, setText] = useState('');
    const [visible, setVisible] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('Select Language');
    const [translatedText, setTranslatedText] = useState('Translation will appear here');
    const [loading, setLoading] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const handleSelect = async (languageCode, label) => {
        setSelectedLanguage(label);
        closeMenu();

        try {
            setLoading(true);
            const response = await fetch('http://192.168.137.1:5000/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text, target_language: languageCode }),
            });

            const data = await response.json();
            setTranslatedText(data.translated_text);
        } catch (error) {
            console.error('Error translating text:', error);
            setTranslatedText('Error: Could not fetch translation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PaperProvider>
            <View>
                <Appbar.Header>
                    <Appbar.Content title='Translator' />
                    <Appbar.Action icon="calendar" size={30} onPress={() => {}} />
                    <Appbar.Action icon="magnify" size={30} onPress={() => {}} />
                </Appbar.Header>

                <Card>
                    <Card.Title title="Translate to your language of preference." />
                    <Card.Content>
                        <Text variant='titleLarge'>Input Language:</Text>
                        <TextInput
                            style={{ marginVertical: 15 }}
                            label="Enter text:"
                            value={text}
                            mode='outlined'
                            multiline={true}
                            onChangeText={setText}
                        />
                        <Divider style={{ marginVertical: 15 }} />

                        {/* Dropdown Menu for Language Selection */}
                        <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={<Button onPress={openMenu}>{selectedLanguage}</Button>}
                        >
                            {Object.entries(languages).map(([code, label]) => (
                                <Menu.Item key={code} onPress={() => handleSelect(code, label)} title={label} />
                            ))}
                        </Menu>

                        <Text variant='headlineSmall' style={{ marginVertical: 15 }}>The text is in: {selectedLanguage}</Text>
                        <Text variant='titleLarge'>Output Language:</Text>
                        {loading ? (
                            <>
                            <ActivityIndicator animating={true} color='MD2Colors.red800'/>
                            <Text variant='bodyLarge'>Translating...</Text>
                            </>
                            
                        ) : (
                            <Text variant='bodyLarge'>{translatedText}</Text>
                        )}
                    </Card.Content>
                </Card>
            </View>
        </PaperProvider>
    );
};

export default Home;
