import { useState } from "react";
import {
    Alert,
    Box,
    Button,
    Container,
    IconButton,
    Paper,
    Snackbar,
    Tab,
    Tabs,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import "@fontsource/vazirmatn";

const morseMapEn = {
    a: ".-",
    b: "-...",
    c: "-.-.",
    d: "-..",
    e: ".",
    f: "..-.",
    g: "--.",
    h: "....",
    i: "..",
    j: ".---",
    k: "-.-",
    l: ".-..",
    m: "--",
    n: "-.",
    o: "---",
    p: ".--.",
    q: "--.-",
    r: ".-.",
    s: "...",
    t: "-",
    u: "..-",
    v: "...-",
    w: ".--",
    x: "-..-",
    y: "-.--",
    z: "--..",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    "0": "-----",
};

const morseMapFa = {
    'ا': '.-', 'ب': '-...', 'پ': '.--.', 'ت': '-', 'ث': '...-', 'ج': '.---', 'چ': '---.-',
    'ح': '....', 'خ': '---.', 'د': '-..', 'ذ': '--..-', 'ر': '.-.', 'ز': '--..',
    'ژ': '.--..', 'س': '...', 'ش': '----', 'ص': '...-...', 'ض': '..--', 'ط': '..-',
    'ظ': '.--.-', 'ع': '.-.-', 'غ': '--.-', 'ف': '..-.', 'ق': '--.-.', 'ک': '-.-',
    'گ': '--.-', 'ل': '.-..', 'م': '--', 'ن': '-.', 'و': '.--', 'ه': '.', 'ی': '..',
    "0": "-----", "۱": ".----", "۲": "..---", "۳": "...--", "۴": "....-", "۵": ".....",
    "۶": "-....", "۷": "--...", "۸": "---..", "۹": "----."
};

const MorseConverter = () => {
    const [lang, setLang] = useState("fa");
    const [textToConvert, setTextToConvert] = useState("");
    const [morseCode, setMorseCode] = useState("");
    const [morseToConvert, setMorseToConvert] = useState("");
    const [convertedText, setConvertedText] = useState("");
    const [tabValue, setTabValue] = useState(0);
    const [toastOpen, setToastOpen] = useState(false);

    const handleLangChange = (event, newLang) => {
        if (newLang) setLang(newLang);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const convertToMorse = () => {
        const map = lang === "fa" ? morseMapFa : morseMapEn;
        const converted = textToConvert
            .split(" ")
            .map(word => word.split("").map(char => map[char] || "").join(" "))
            .join(" / ");
        setMorseCode(converted);
    };

    const convertToText = () => {
        const map = lang === "fa" ? morseMapFa : morseMapEn;
        const reversedMap = Object.fromEntries(Object.entries(map).map(([k, v]) => [v, k]));
        const converted = morseToConvert
            .split(" / ")
            .map(word => word.split(" ").map(code => reversedMap[code] || "").join(""))
            .join(" ");
        setConvertedText(converted);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => setToastOpen(true));
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4, fontFamily: "Vazirmatn, sans-serif" }}>
            <Typography variant="h4" gutterBottom align="center">
                مبدل کد مورس
            </Typography>

            <Tabs value={tabValue} onChange={handleTabChange} centered>
                <Tab label="تبدیل متن به کد مورس"/>
                <Tab label="تبدیل کد مورس به متن"/>
            </Tabs>

            <ToggleButtonGroup
                color="primary"
                value={lang}
                exclusive
                onChange={handleLangChange}
                sx={{ my: 2 }}
            >
                <ToggleButton value="fa">فارسی</ToggleButton>
                <ToggleButton value="en">انگلیسی</ToggleButton>
            </ToggleButtonGroup>

            {tabValue === 0 && (
                <Paper elevation={3} sx={{ p: 3 }}>
                    <TextField
                        label="متن خود را وارد کنید"
                        multiline
                        rows={4}
                        dir={lang === 'fa' ? 'rtl' : 'ltr'}
                        fullWidth
                        variant="outlined"
                        value={textToConvert}
                        onChange={(e) => setTextToConvert(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" fullWidth onClick={convertToMorse}>
                        تبدیل به کد مورس
                    </Button>

                    <Box display="flex" alignItems="center" mt={2}>
                        <Box sx={{ p: 2, border: '1px dashed grey', width: '100%' }}>{morseCode}</Box>
                        <IconButton onClick={() => copyToClipboard(morseCode)}>
                            <ContentCopy/>
                        </IconButton>
                    </Box>
                </Paper>
            )}

            {tabValue === 1 && (
                <Paper elevation={3} sx={{ p: 3 }}>
                    <TextField
                        label="کد مورس را وارد کنید"
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                        value={morseToConvert}
                        onChange={(e) => setMorseToConvert(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" fullWidth onClick={convertToText} color="success">
                        تبدیل به متن
                    </Button>

                    <Box display="flex" alignItems="center" mt={2}>
                        <Box sx={{ p: 2, border: '1px dashed grey', width: '100%'}}
                             dir={lang === 'fa' ? 'rtl' : 'ltr'}>
                            {convertedText}
                        </Box>
                        <IconButton onClick={() => copyToClipboard(convertedText)}>
                            <ContentCopy/>
                        </IconButton>
                    </Box>
                </Paper>
            )}

            <Snackbar
                open={toastOpen}
                autoHideDuration={2000}
                onClose={() => setToastOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ width: "100%" }}>
                    متن کپی شد!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default MorseConverter;
