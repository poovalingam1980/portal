# 🔥 சிவகங்கை மாவட்ட முதன்மைக் கல்வி அலுவலக தளம் (portal.ceosvg.in)
## மையப்படுத்தப்பட்ட நேரடி மேகக்கணித் தரவுத்தளம் (Firebase Real-Time Cloud Database) இணைப்பு வழிகாட்டி

ஒரு பள்ளியில் தலைமையாசிரியர் (HM) சேமிக்கும் மாணவர் எண்ணிக்கை, ஆசிரியர் பதிவேடு, நீக்கக் கோரிக்கை அல்லது பள்ளி சுயவிவர மாற்றங்கள் **அதே வினாடியில் (`< 1 Second`)** முதன்மைக் கல்வி அலுவலர் (CEO Admin) முகப்பில் பிரதிபலிக்கும் வகையில் இத்தளத்தில் **Firebase Realtime Database Engine (SSE + REST + Multi-Tab Live Bus)** முழுமையாக இணைக்கப்பட்டுள்ளது.

---

### 🚀 1. இலவச Firebase Realtime Database உருவாக்கும் 5 எளிய படிகள்

#### **படி 1: Firebase Project உருவாக்குதல்**
1. உங்கள் உலாவியில் [Firebase Console (https://console.firebase.google.com/)](https://console.firebase.google.com/) தளத்திற்குச் சென்று உங்கள் அலுவலக Google கணக்கில் உள்நுழையவும்.
2. **"Create a project"** (அல்லது **"Add project"**) பொத்தானைக் கிளிக் செய்யவும்.
3. Project பெயராக `ceosvg-school-portal` என உள்ளிட்டு **Continue** கொடுக்கவும் (Google Analytics விருப்பத்தேர்வை Off செய்யலாம்) ➔ **Create project** அழுத்தவும்.

#### **படி 2: Realtime Database தொடங்குதல்**
1. இடதுபுற மெனுவில் **Build ➔ Realtime Database** என்பதைத் தேர்ந்தெடுக்கவும்.
2. **"Create Database"** பொத்தானைக் கிளிக் செய்யவும்.
3. **Realtime Database location** என்பதில் இந்தியாவிற்கு மிக அருகிலுள்ள அதிவேக சர்வரான **`Singapore (asia-southeast1)`** என்பதைத் தேர்ந்தெடுத்து **Next** கொடுக்கவும்.
4. **Security rules** என்பதில் **"Start in test mode"** தேர்ந்தெடுத்து **Enable** செய்யவும்.

#### **படி 3: பாதுகாப்பு விதிகள் (Security Rules) அமைத்தல்**
1. Realtime Database திறந்தவுடன் மேலே உள்ள **"Rules"** தாவலைத் (Tab) திறக்கவும்.
2. அங்குள்ள குறியீட்டிற்குப் பதிலாகக் கீழ்க்கண்ட JSON விதிகளை ஒட்டி **"Publish"** பொத்தானை அழுத்தவும்:

```json
{
  "rules": {
    "ceosvg_live": {
      ".read": true,
      ".write": true,
      "school_extra": {
        "$uNo": {
          ".read": true,
          ".write": true
        }
      },
      "master_schools_by_uno": {
        "$uNo": {
          ".read": true,
          ".write": true
        }
      },
      "school_auth": {
        "$uNo": {
          ".read": true,
          ".write": true
        }
      }
    }
  }
}
```

#### **படி 4: தளத்துடன் Firebase URL-ஐ இணைத்தல் & 282 பள்ளிகளைப் பதிவேற்றுதல்**
1. இப்போது Firebase-ன் **"Data"** தாவலில் மேலே தோன்றும் இணைப்பை நகலெடுக்கவும்:
   *(உதாரணம்: `https://ceosvg-school-portal-default-rtdb.asia-southeast1.firebasedatabase.app`)*
2. நமது `portal.ceosvg.in` தளத்தின் மேல் பட்டியிலுள்ள **"🔥 Firebase நேரடி இணைப்பு"** (அல்லது **"⚙️ இணைப்பு அமைப்பு"**) பொத்தானைக் கிளிக் செய்யவும்.
3. **1. Firebase Realtime Database URL** கட்டத்தில் அந்த இணைப்பை ஒட்டவும் (அல்லது Firebase Console-ன் `firebaseConfig` முழுக் குறியீட்டையும் கீழேயுள்ள பெட்டியில் ஒட்டினால் தானாகவே URL பிரித்தெடுக்கப்படும்).
4. முதலில் **"🔌 இணைப்பைச் சோதி (Test Connection)"** அழுத்தி இணைப்பை உறுதி செய்யவும்.
5. அடுத்து **"🚀 282 பள்ளிகளின் முழுத் தரவையும் Firebase-க்கு பதிவேற்று (Initial Seed)"** பொத்தானை ஒருமுறை அழுத்தவும். இப்போது 282 பள்ளிகள், பணியாளர்கள், மாணவர்கள், முக்கியப் பிரமுகர்கள் மற்றும் சுற்றறிக்கைகள் அனைத்தும் மேகக்கணியில் பதிவேற்றப்படும்.

#### **படி 5: அனைத்து 282 பள்ளிகளுக்கும் நிரந்தரமாக இணைக்க (`portal.ceosvg.in` Hosting)**
* ஒவ்வொரு பள்ளியும் தனித்தனியாக URL உள்ளிடத் தேவையில்லாமல், அனைத்து 282 பள்ளிகளும் தளத்தைத் திறந்தவுடனேயே தானாக இணைய:
  `index.html` (அல்லது `index_modular.html`) கோப்பில் உள்ள:
  ```javascript
  const DEFAULT_FIREBASE_DB_URL = "";
  ```
  என்ற வரியில் உங்கள் URL-ஐ உள்ளிட்டுச் சேமித்து இணையதளத்தில் பதிவேற்றவும்:
  ```javascript
  const DEFAULT_FIREBASE_DB_URL = "https://ceosvg-school-portal-default-rtdb.asia-southeast1.firebasedatabase.app";
  ```

---

### ⚡ 2. நேரடி ஒத்திசைவு எவ்வாறு செயல்படுகிறது? (Granular Real-Time Architecture)

| நிகழ்வு (Action) | Firebase-ல் சேமிக்கப்படும் முகவரி (Cloud Node) | CEO முகப்பில் பிரதிபலிக்கும் நேரம் |
| :--- | :--- | :--- |
| **பள்ளி தலைமையாசிரியர்** மாணவர் எண்ணிக்கை / ஆசிரியர் பதிவேடு / அடிப்படைத் தேவை சேமித்தல் | `/ceosvg_live/school_extra/{uNo}.json` | **< 1 வினாடி** (Server-Sent Events `EventSource` வழியாக உடனடி அறிவிப்பு & அட்டவணை புதுப்பிப்பு) |
| **பள்ளி தலைமையாசிரியர்** பள்ளி சுயவிவரம் / கைபேசி எண் சேமித்தல் | `/ceosvg_live/master_schools_by_uno/{uNo}.json` | **< 1 வினாடி** (மாவட்டப் பள்ளிகள் பட்டியலில் உடனடி மாற்றம்) |
| **பள்ளி தலைமையாசிரியர்** பணியாளர் நீக்கக் கோரிக்கை அனுப்புதல் | `/ceosvg_live/stores/CEOSVG_DELETE_REQUESTS.json` | **< 1 வினாடி** (CEO முகப்பில் நீக்கக் கோரிக்கை எண்ணிக்கை உடனடியாக உயரும்) |
| **மாவட்ட நிர்வாகி (CEO)** முக்கியப் பிரமுகர்கள் / சுற்றறிக்கை / நீக்க ஒப்புதல் சேமித்தல் | `/ceosvg_live/stores/{StoreKey}.json` | **< 1 வினாடி** (அனைத்து 282 பள்ளிகளின் முகப்பிலும் உடனடியாகப் பிரதிபலிக்கும்) |

* **தனித்தனி பள்ளி முகவரி (Per-School Granular Writes)**: பள்ளி எண் `201` சேமிக்கும்போது `/ceosvg_live/school_extra/201` என்ற முகவரி மட்டுமே புதுப்பிக்கப்படும். இதனால் ஒரே நேரத்தில் 50 பள்ளிகளின் தலைமையாசிரியர்கள் சேமித்தாலும் ஒரு பள்ளித் தரவு மற்றொரு பள்ளித் தரவை அழிக்காது (Zero Overwrite Conflict).
