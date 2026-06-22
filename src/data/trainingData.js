// Comprehensive Training Dataset for FIR Classification with Official IPC Sections

export const FIR_TRAINING_DATA = [
  // 1. Theft Cases - IPC Section 378, 379, 380
  {
    text: "Complainant reports that on 15th March 2024, unknown persons broke into his residence at 123 Main Street and stole cash amounting to Rs. 50,000, gold jewelry worth Rs. 2 lakhs, and electronic items including laptop and mobile phones. The incident occurred between 10 AM and 2 PM when the family was away. Entry was gained by breaking the rear window. Neighbors reported seeing suspicious persons in the area.",
    category: "Theft",
    section: "IPC 378",
    severity: "Medium",
    priority: "Normal",
    keywords: ["stole", "broke into", "residence", "cash", "jewelry", "electronic items"]
  },
  {
    text: "Victim states that while traveling in a crowded bus on 20th March 2024, her wallet containing Rs. 15,000, credit cards, and identification documents was stolen by pickpockets. She realized the theft upon reaching her destination. The bus was traveling from City Center to Suburban area.",
    category: "Theft",
    section: "IPC 379",
    severity: "Low",
    priority: "Normal",
    keywords: ["pickpockets", "wallet", "stolen", "crowded bus", "credit cards"]
  },
  {
    text: "Shop owner reports that on 18th March 2024 at around 3 AM, burglars broke into his electronics store by breaking the main door lock. They stole 15 smartphones, 8 laptops, and various accessories worth approximately Rs. 8 lakhs. CCTV footage shows masked individuals committing the crime.",
    category: "Theft",
    section: "IPC 380",
    severity: "High",
    priority: "High",
    keywords: ["burglars", "store", "smartphones", "laptops", "masked individuals"]
  },
  {
    text: "Employee reports that his colleague has been stealing company confidential documents for the past 3 months. The stolen information includes client lists, financial reports, and strategic plans. The employee has evidence of documents being copied to USB drives and sent to external email addresses.",
    category: "Theft",
    section: "IPC 378",
    severity: "High",
    priority: "High",
    keywords: ["stealing", "confidential documents", "copied", "external email"]
  },
  {
    text: "Farmer complains that someone has been stealing crops from his agricultural land during nighttime. Over the past month, approximately 500 kg of vegetables and fruits have been stolen. The thief appears to be using a vehicle to transport the stolen goods.",
    category: "Theft",
    section: "IPC 379",
    severity: "Medium",
    priority: "Normal",
    keywords: ["stealing", "crops", "agricultural land", "nighttime", "vehicle"]
  },
  {
    text: "Library patron reports that someone stole their backpack containing laptop, textbooks, and research notes while they were using the restroom. The incident occurred at the university library on 25th March 2024 around 2 PM. Security cameras were not functioning in that area.",
    category: "Theft",
    section: "IPC 378",
    severity: "Medium",
    priority: "Normal",
    keywords: ["stole", "backpack", "laptop", "textbooks", "library"]
  },
  {
    text: "Bicycle owner reports that his new bicycle worth Rs. 15,000 was stolen from the apartment parking area. The lock was cut and the bicycle was taken between 8 PM and 10 PM. Security footage shows two individuals near the parking area during the time of theft.",
    category: "Theft",
    section: "IPC 379",
    severity: "Low",
    priority: "Normal",
    keywords: ["bicycle", "stolen", "parking", "lock cut", "security footage"]
  },

  // 2. Robbery Cases - IPC Section 390, 392
  {
    text: "Complainant alleges that on 22nd March 2024 at 9 PM, he was robbed by three unknown persons near the railway station. The attackers threatened him with knives and stole his wallet containing Rs. 5,000 and mobile phone. He sustained minor injuries during the struggle.",
    category: "Robbery",
    section: "IPC 390",
    severity: "High",
    priority: "High",
    keywords: ["robbed", "threatened", "knives", "wallet", "mobile phone", "injuries"]
  },
  {
    text: "Jewelry shop owner reports that armed robbers entered his shop on 25th March 2024 at 11 AM. They threatened staff with firearms and stole gold jewelry worth Rs. 20 lakhs and cash from the safe. The entire incident lasted 5 minutes.",
    category: "Robbery",
    section: "IPC 392",
    severity: "High",
    priority: "Urgent",
    keywords: ["armed robbers", "firearms", "gold jewelry", "safe", "threatened"]
  },
  {
    text: "Bank customer reports that while withdrawing money from ATM, two individuals threatened him with weapons and forced him to withdraw additional cash. They stole Rs. 50,000 and his debit card before fleeing.",
    category: "Robbery",
    section: "IPC 390",
    severity: "High",
    priority: "High",
    keywords: ["ATM", "threatened", "weapons", "withdrew", "debit card"]
  },
  {
    text: "Street vendor reports that a group of 4-5 individuals robbed his fruit cart at knifepoint. They stole cash box containing Rs. 8,000 and mobile phone. The incident occurred in busy market area during evening hours.",
    category: "Robbery",
    section: "IPC 392",
    severity: "Medium",
    priority: "High",
    keywords: ["knifepoint", "fruit cart", "cash box", "mobile phone", "market area"]
  },

  // 3. Murder Cases - IPC Section 300, 302
  {
    text: "Police report that on 26th March 2024, a 45-year-old male was found dead in his apartment with multiple stab wounds. The victim appears to have been attacked by unknown assailants. The building residents reported hearing arguments the previous night.",
    category: "Murder",
    section: "IPC 300",
    severity: "High",
    priority: "Urgent",
    keywords: ["dead", "stab wounds", "unknown assailants", "arguments", "apartment"]
  },
  {
    text: "Family reports that their 28-year-old son was shot dead during a road rage incident on 24th March 2024. The suspect fled the scene after shooting the victim multiple times. Witnesses provided vehicle description.",
    category: "Murder",
    section: "IPC 302",
    severity: "High",
    priority: "Urgent",
    keywords: ["shot dead", "road rage", "multiple times", "suspect fled", "witnesses"]
  },
  {
    text: "Police discovered a body in the city park on 27th March 2024. The victim appears to have been strangled to death. Investigation suggests the murder occurred 2-3 days prior to discovery.",
    category: "Murder",
    section: "IPC 300",
    severity: "High",
    priority: "Urgent",
    keywords: ["body", "strangled", "city park", "discovered", "investigation"]
  },
  {
    text: "Businessman reports that his partner was murdered in their office on 23rd March 2024. The victim was found with head injuries from blunt force trauma. The office was ransacked suggesting robbery motive.",
    category: "Murder",
    section: "IPC 302",
    severity: "High",
    priority: "Urgent",
    keywords: ["partner murdered", "office", "head injuries", "blunt force", "ransacked"]
  },

  // 4. Attempt to Murder - IPC Section 307
  {
    text: "Victim reports that on 21st March 2024, her husband attempted to kill her by strangulation during a domestic dispute. She managed to escape and seek medical help. The accused has been arrested.",
    category: "Attempt to Murder",
    section: "IPC 307",
    severity: "High",
    priority: "Urgent",
    keywords: ["attempted to kill", "strangulation", "domestic dispute", "escaped", "arrested"]
  },
  {
    text: "Police report that unknown individuals fired shots at a residence on 22nd March 2024. The occupants escaped injury but the house was damaged by bullets. This appears to be an attempted murder case.",
    category: "Attempt to Murder",
    section: "IPC 307",
    severity: "High",
    priority: "Urgent",
    keywords: ["fired shots", "residence", "escaped injury", "bullets", "attempted murder"]
  },
  {
    text: "Woman reports that her ex-boyfriend tried to kill her by poisoning her food on 25th March 2024. She became suspicious after tasting the food and sought medical attention. Tests confirmed presence of poison.",
    category: "Attempt to Murder",
    section: "IPC 307",
    severity: "High",
    priority: "Urgent",
    keywords: ["poisoning", "food", "ex-boyfriend", "medical attention", "poison confirmed"]
  },

  // 5. Kidnapping Cases - IPC Section 359, 363
  {
    text: "Father reports that his 8-year-old son was kidnapped from school premises on 26th March 2024. Unknown persons took the child during school hours. Ransom demand of Rs. 10 lakhs was made via phone call.",
    category: "Kidnapping",
    section: "IPC 359",
    severity: "High",
    priority: "Urgent",
    keywords: ["kidnapped", "son", "school premises", "ransom demand", "phone call"]
  },
  {
    text: "Businessman reports that he was kidnapped for ransom on 24th March 2024. He was held captive for 2 days before being released after family paid Rs. 5 lakhs. The kidnappers used a van for transportation.",
    category: "Kidnapping",
    section: "IPC 363",
    severity: "High",
    priority: "Urgent",
    keywords: ["kidnapped", "ransom", "captive", "released", "van"]
  },
  {
    text: "Mother reports that her 16-year-old daughter was kidnapped by unknown persons while returning from tuition classes. The kidnappers have contacted family demanding money for safe return.",
    category: "Kidnapping",
    section: "IPC 359",
    severity: "High",
    priority: "Urgent",
    keywords: ["kidnapped", "daughter", "tuition classes", "demanding money", "safe return"]
  },

  // 6. Rape Cases - IPC Section 375, 376
  {
    text: "Woman reports that she was sexually assaulted by her colleague in the office after hours on 23rd March 2024. The accused threatened her with harm if she reported the incident. Medical examination confirms sexual assault.",
    category: "Rape",
    section: "IPC 375",
    severity: "High",
    priority: "Urgent",
    keywords: ["sexually assaulted", "colleague", "office", "threatened", "medical examination"]
  },
  {
    text: "Minor girl's parents report that their 14-year-old daughter was raped by a neighbor on 25th March 2024. The accused lured the child with sweets and committed the crime when parents were away.",
    category: "Rape",
    section: "IPC 376",
    severity: "High",
    priority: "Urgent",
    keywords: ["raped", "minor girl", "neighbor", "lured", "parents away"]
  },
  {
    text: "Woman reports that she was gang-raped by three men in a moving vehicle on 22nd March 2024. The accused abducted her from the street and committed the crime. She was later dumped on the roadside.",
    category: "Rape",
    section: "IPC 376",
    severity: "High",
    priority: "Urgent",
    keywords: ["gang-raped", "moving vehicle", "abducted", "street", "dumped"]
  },

  // 7. Assault Cases - IPC Section 351, 352
  {
    text: "Complainant alleges that on 22nd March 2024 at 9 PM, he was assaulted by three unknown persons near the railway station. The attackers beat him with sticks and robbed him of his wallet containing Rs. 5,000. He sustained injuries on his head and arms.",
    category: "Assault",
    section: "IPC 351",
    severity: "Medium",
    priority: "High",
    keywords: ["assaulted", "beat", "sticks", "robbed", "injuries", "head"]
  },
  {
    text: "Student reports that on 20th March 2024, he was attacked by a group of 4-5 senior students in the college campus over a previous rivalry. They punched and kicked him, resulting in multiple injuries. The college authorities were informed.",
    category: "Assault",
    section: "IPC 352",
    severity: "Medium",
    priority: "Normal",
    keywords: ["attacked", "senior students", "campus", "rivalry", "injuries"]
  },
  {
    text: "Restaurant customer reports that on 23rd March 2024, he was physically assaulted by the restaurant staff after complaining about food quality. The manager and two waiters pushed him and threatened him with violence.",
    category: "Assault",
    section: "IPC 351",
    severity: "Medium",
    priority: "Normal",
    keywords: ["physically assaulted", "restaurant staff", "pushed", "threatened", "violence"]
  },
  {
    text: "Senior citizen reports that on 21st March 2024, she was assaulted and robbed by two young men while walking home from the market. They pushed her to the ground and grabbed her purse containing Rs. 10,000.",
    category: "Assault",
    section: "IPC 352",
    severity: "Medium",
    priority: "High",
    keywords: ["assaulted", "robbed", "pushed", "ground", "purse"]
  },

  // 8. Domestic Violence - IPC Section 498A
  {
    text: "Woman reports that during a domestic dispute on 25th March 2024, her husband physically assaulted her, causing bruises on her face and arms. The incident occurred at their residence at 456 Park Avenue. She has been married for 5 years.",
    category: "Domestic Violence",
    section: "IPC 498A",
    severity: "High",
    priority: "High",
    keywords: ["domestic dispute", "physically assaulted", "husband", "bruises", "residence"]
  },
  {
    text: "Woman reports that her in-laws have been subjecting her to mental and physical cruelty for dowry demands. They harass her daily and threaten to throw her out of the house if dowry is not paid.",
    category: "Domestic Violence",
    section: "IPC 498A",
    severity: "High",
    priority: "High",
    keywords: ["in-laws", "cruelty", "dowry demands", "harass", "threaten"]
  },
  {
    text: "Woman reports that her husband and his parents have been torturing her for not bringing enough dowry. They starve her and beat her regularly. She has been married for 2 years and has a 6-month-old child.",
    category: "Domestic Violence",
    section: "IPC 498A",
    severity: "High",
    priority: "Urgent",
    keywords: ["torturing", "dowry", "starve", "beat", "regularly"]
  },

  // 9. Fraud/Cheating - IPC Section 415, 420
  {
    text: "Complainant states that he received a phone call on 10th March 2024 from someone claiming to be from his bank, asking for his account details for verification. He provided the information and later found that Rs. 1,20,000 was fraudulently transferred from his account.",
    category: "Fraud / Cheating",
    section: "IPC 420",
    severity: "High",
    priority: "High",
    keywords: ["phone call", "bank", "account details", "fraudulently transferred", "verification"]
  },
  {
    text: "Business owner reports that his employee, the accountant, has been embezzling company funds for the past 6 months. An audit revealed that Rs. 25 lakhs has been siphoned off through fake invoices and manipulated accounts.",
    category: "Fraud / Cheating",
    section: "IPC 415",
    severity: "High",
    priority: "High",
    keywords: ["embezzling", "company funds", "audit", "fake invoices", "manipulated accounts"]
  },
  {
    text: "Victim reports that she purchased a car online through a classified website. She paid Rs. 3 lakhs in advance but never received the car. The seller has disappeared and the phone number is now unreachable.",
    category: "Fraud / Cheating",
    section: "IPC 420",
    severity: "Medium",
    priority: "Normal",
    keywords: ["online purchase", "classified website", "advance payment", "disappeared", "unreachable"]
  },
  {
    text: "Elderly person reports that someone claiming to be a government officer called and told her she had won a lottery of Rs. 10 lakhs. To claim the prize, she was asked to pay Rs. 50,000 as processing fees. She paid the amount but never received any prize.",
    category: "Fraud / Cheating",
    section: "IPC 420",
    severity: "High",
    priority: "High",
    keywords: ["government officer", "lottery", "prize money", "processing fees", "never received"]
  },

  // 10. Cyber Crime - IT Act Section 66, 67
  {
    text: "Victim reports that his social media account was hacked and unauthorized posts were made defaming his character. The hacker also accessed his private messages and threatened to leak personal information unless paid Rs. 50,000.",
    category: "Cyber Crime",
    section: "IT Act 66",
    severity: "High",
    priority: "High",
    keywords: ["hacked", "social media", "unauthorized posts", "personal information", "threatened"]
  },
  {
    text: "Business owner reports that his company website was subjected to a ransomware attack. All customer data was encrypted and hackers demanded Rs. 5 lakhs in cryptocurrency to restore access. The attack occurred on 26th March 2024.",
    category: "Cyber Crime",
    section: "IT Act 66",
    severity: "High",
    priority: "Urgent",
    keywords: ["ransomware", "website", "encrypted", "hackers demanded", "cryptocurrency"]
  },
  {
    text: "Student reports that someone created a fake profile using her photos and personal information on a dating app. The fake profile was used to harass and defame multiple people, causing damage to her reputation.",
    category: "Cyber Crime",
    section: "IT Act 67",
    severity: "Medium",
    priority: "Normal",
    keywords: ["fake profile", "photos", "dating app", "harass", "defame"]
  },
  {
    text: "Online shopper reports that his credit card details were stolen while making a purchase on an e-commerce website. Subsequently, unauthorized transactions totaling Rs. 75,000 were made from his account.",
    category: "Cyber Crime",
    section: "IT Act 66",
    severity: "High",
    priority: "High",
    keywords: ["credit card", "stolen", "e-commerce", "unauthorized transactions", "online purchase"]
  },

  // 11. Breach of Trust - IPC Section 405, 406
  {
    text: "Client reports that his lawyer misappropriated Rs. 15 lakhs that was supposed to be used for property registration. The lawyer used the funds for personal expenses and is now refusing to return the money.",
    category: "Breach of Trust",
    section: "IPC 405",
    severity: "High",
    priority: "High",
    keywords: ["misappropriated", "property registration", "personal expenses", "refusing", "lawyer"]
  },
  {
    text: "Business partner reports that his partner cheated him out of Rs. 20 lakhs by transferring company funds to personal accounts. The partner was entrusted with financial management but betrayed the trust.",
    category: "Breach of Trust",
    section: "IPC 406",
    severity: "High",
    priority: "High",
    keywords: ["cheated", "transferring", "company funds", "personal accounts", "financial management"]
  },
  {
    text: "Employee reports that his manager collected money from 50 employees for a group tour but never booked the tour. The manager has disappeared with Rs. 2 lakhs collected from employees.",
    category: "Breach of Trust",
    section: "IPC 405",
    severity: "Medium",
    priority: "High",
    keywords: ["collected money", "group tour", "never booked", "disappeared", "employees"]
  },

  // 12. Public Nuisance - IPC Section 268
  {
    text: "Residents complain that a factory in their residential area operates 24 hours causing loud noise and air pollution. The factory operations affect the health and peace of mind of nearby residents, especially children and elderly.",
    category: "Public Nuisance",
    section: "IPC 268",
    severity: "Medium",
    priority: "Normal",
    keywords: ["factory", "loud noise", "air pollution", "residential area", "health"]
  },
  {
    text: "Shop owners report that street vendors block the main road causing traffic congestion. The vendors create public nuisance by occupying public space and causing inconvenience to commuters and local residents.",
    category: "Public Nuisance",
    section: "IPC 268",
    severity: "Low",
    priority: "Normal",
    keywords: ["street vendors", "traffic congestion", "public space", "inconvenience", "commuters"]
  },
  {
    text: "Residents complain that a neighbor plays loud music late at night disturbing the entire neighborhood. Despite multiple complaints, the neighbor continues to create noise pollution affecting sleep and peace.",
    category: "Public Nuisance",
    section: "IPC 268",
    severity: "Low",
    priority: "Normal",
    keywords: ["loud music", "night", "neighborhood", "noise pollution", "sleep"]
  },

  // 13. Rioting - IPC Section 141, 146
  {
    text: "Police report that on 26th March 2024, a group of 50 people gathered and started rioting in the market area over a religious dispute. They damaged shops, vehicles, and public property. Several people were injured in the violence.",
    category: "Rioting",
    section: "IPC 146",
    severity: "High",
    priority: "Urgent",
    keywords: ["rioting", "market area", "religious dispute", "damaged shops", "violence"]
  },
  {
    text: "Commuter reports that a group of protesters blocked the main highway and started pelting stones at vehicles. The unlawful assembly caused traffic disruption and damage to several cars. Police had to use force to disperse the crowd.",
    category: "Rioting",
    section: "IPC 141",
    severity: "Medium",
    priority: "High",
    keywords: ["protesters", "blocked highway", "pelting stones", "unlawful assembly", "disperse"]
  },
  {
    text: "Shop owners report that during a labor dispute, workers gathered unlawfully and started damaging factory property. They set fire to machinery and broke windows, causing significant damage to the establishment.",
    category: "Rioting",
    section: "IPC 146",
    severity: "High",
    priority: "High",
    keywords: ["labor dispute", "unlawfully", "damaging property", "set fire", "machinery"]
  },

  // 14. Dowry Death - IPC Section 304B
  {
    text: "Family reports that their daughter was found dead at her in-laws' house on 27th March 2024. The death occurred within 7 years of marriage and there is evidence of dowry harassment. The in-laws were demanding additional dowry before her death.",
    category: "Dowry Death",
    section: "IPC 304B",
    severity: "High",
    priority: "Urgent",
    keywords: ["dead", "in-laws house", "dowry harassment", "demanding dowry", "marriage"]
  },
  {
    text: "Parents report that their 24-year-old daughter was killed by her husband and in-laws for not bringing sufficient dowry. The incident occurred 3 years after marriage. The accused were constantly torturing her for more dowry.",
    category: "Dowry Death",
    section: "IPC 304B",
    severity: "High",
    priority: "Urgent",
    keywords: ["killed", "husband", "in-laws", "sufficient dowry", "torturing"]
  },
  {
    text: "Woman reports that her sister was found dead under suspicious circumstances at her marital home. The sister was being harassed for dowry since marriage. The death occurred within 2 years of marriage.",
    category: "Dowry Death",
    section: "IPC 304B",
    severity: "High",
    priority: "Urgent",
    keywords: ["dead", "suspicious circumstances", "marital home", "harassed for dowry", "marriage"]
  },

  // 15. Defamation - IPC Section 499, 500
  {
    text: "Businessman reports that his competitor has been spreading false rumors about his business on social media. The false statements have damaged his reputation and caused loss of customers.",
    category: "Defamation",
    section: "IPC 499",
    severity: "Medium",
    priority: "Normal",
    keywords: ["spreading rumors", "social media", "false statements", "damaged reputation", "loss of customers"]
  },
  {
    text: "Politician reports that his opponent has published defamatory articles in local newspapers accusing him of corruption without any evidence. The articles have harmed his political career and personal reputation.",
    category: "Defamation",
    section: "IPC 500",
    severity: "Medium",
    priority: "Normal",
    keywords: ["defamatory articles", "newspapers", "corruption", "harmed career", "personal reputation"]
  },
  {
    text: "Teacher reports that a parent has been spreading false allegations against her in the school community. The parent accused her of mistreating students without any proof, damaging her professional reputation.",
    category: "Defamation",
    section: "IPC 499",
    severity: "Medium",
    priority: "Normal",
    keywords: ["false allegations", "school community", "mistreating students", "professional reputation", "without proof"]
  }
];

// Legal Terms and IPC Sections Reference
export const LEGAL_TERMS = {
  FIR_CATEGORIES: {
    "Theft": "Unlawful taking of someone else's property - IPC 378, 379, 380",
    "Robbery": "Theft using violence or threat of violence - IPC 390, 392",
    "Murder": "Causing death with intent - IPC 300, 302",
    "Attempt to Murder": "Attempting to cause death - IPC 307",
    "Kidnapping": "Unlawful taking away of a person - IPC 359, 363",
    "Rape": "Sexual assault without consent - IPC 375, 376",
    "Assault": "Physical attack or threat - IPC 351, 352",
    "Domestic Violence": "Cruelty by husband or relatives - IPC 498A",
    "Fraud / Cheating": "Deception for financial gain - IPC 415, 420",
    "Cyber Crime": "Computer-related offences - IT Act 66, 67",
    "Breach of Trust": "Misappropriation of entrusted property - IPC 405, 406",
    "Public Nuisance": "Acts causing common injury or danger - IPC 268",
    "Rioting": "Unlawful assembly and violence - IPC 141, 146",
    "Dowry Death": "Death of woman caused by dowry demands - IPC 304B",
    "Defamation": "Harming reputation through false statements - IPC 499, 500"
  },
  SEVERITY_LEVELS: {
    "Low": "Minor incidents with minimal impact",
    "Medium": "Significant incidents requiring investigation",
    "High": "Serious incidents requiring immediate attention"
  },
  PRIORITY_LEVELS: {
    "Normal": "Standard investigation timeline",
    "High": "Expedited investigation required",
    "Urgent": "Immediate action required"
  }
};

// Enhanced Classification Features for ML Model
export const CLASSIFICATION_FEATURES = [
  // Theft related
  "theft", "stole", "robbed", "burglary", "break", "enter", "stolen", "pickpocket", "shoplifting",
  
  // Violence related
  "assault", "attack", "beat", "hit", "violence", "threat", "injure", "pushed", "punched", "kicked",
  
  // Fraud related
  "fraud", "fake", "embezzle", "deceive", "scam", "cheat", "manipulate", "counterfeit", "forgery",
  
  // Property related
  "property", "land", "house", "building", "encroach", "dispute", "boundary", "residence",
  
  // Vehicle related
  "accident", "collision", "crash", "hit", "vehicle", "car", "truck", "bike", "motorcycle", "traffic",
  
  // Cyber related
  "cyber", "hack", "online", "internet", "computer", "website", "social", "media", "digital",
  "ransomware", "encrypted", "profile", "dating", "credit", "card", "identity",
  
  // Harassment related
  "harass", "bully", "stalking", "inappropriate", "explicit", "messages", "unwanted", "threatening",
  
  // Domestic related
  "domestic", "husband", "wife", "in-laws", "family", "home", "marriage", "dowry", "cruelty",
  
  // Serious crimes
  "murder", "killed", "dead", "death", "shot", "stab", "strangled", "poison", "attempt", "kidnap",
  
  // Legal terms
  "police", "report", "complaint", "investigation", "case", "legal", "court", "arrest", "evidence",
  "witness", "suspect", "victim", "accused", "charges", "prosecution",
  
  // Financial terms
  "money", "cash", "amount", "value", "worth", "lakhs", "thousand", "payment", "transaction",
  "bank", "account", "transfer", "withdraw", "deposit", "loan", "debt",
  
  // Location terms
  "street", "road", "market", "shop", "office", "school", "college", "hospital", "parking",
  "apartment", "building", "residential", "commercial", "public", "private"
];

// Comprehensive Summarization Training Data for Legal Documents
export const SUMMARIZATION_TRAINING_DATA = [
  // Theft Cases
  {
    original: "Complainant reports that on 15th March 2024, unknown persons broke into his residence at 123 Main Street and stole cash amounting to Rs. 50,000, gold jewelry worth Rs. 2 lakhs, and electronic items including laptop and mobile phones. The incident occurred between 10 AM and 2 PM when the family was away. Entry was gained by breaking the rear window. Neighbors reported seeing suspicious persons in the area. The complainant has provided a list of stolen items and estimates total loss at Rs. 2.5 lakhs. Police have been informed and investigation is underway.",
    summary: "Burglary at 123 Main Street on 15th March 2024 (10 AM-2 PM). Unknown persons stole Rs. 50,000 cash, gold jewelry (Rs. 2 lakhs), and electronics by breaking rear window. Total loss: Rs. 2.5 lakhs. Investigation ongoing."
  },
  {
    original: "Victim states that while traveling in a crowded bus on 20th March 2024, her wallet containing Rs. 15,000, credit cards, and identification documents was stolen by pickpockets. She realized the theft upon reaching her destination. The bus was traveling from City Center to Suburban area. She immediately reported the matter to the bus conductor and filed a complaint with the transport authority. All credit cards have been blocked and a police report has been filed.",
    summary: "Pickpocketing on 20th March 2024 in crowded bus (City Center to Suburban). Victim's wallet stolen containing Rs. 15,000, credit cards, and ID documents. Cards blocked, police complaint filed."
  },
  {
    original: "Shop owner reports that on 18th March 2024 at around 3 AM, burglars broke into his electronics store by breaking the main door lock. They stole 15 smartphones, 8 laptops, and various accessories worth approximately Rs. 8 lakhs. CCTV footage shows masked individuals committing the crime. The shop owner has reviewed the footage and provided it to police. The store was closed for business on the day of the incident.",
    summary: "Electronics store burglary on 18th March 2024 at 3 AM. Masked burglars broke door lock, stole 15 smartphones, 8 laptops, and accessories worth Rs. 8 lakhs. CCTV footage provided to police."
  },

  // Robbery Cases
  {
    original: "Complainant alleges that on 22nd March 2024 at 9 PM, he was robbed by three unknown persons near the railway station. The attackers threatened him with knives and stole his wallet containing Rs. 5,000 and mobile phone. He sustained minor injuries during the struggle but managed to escape. He was taken to City Hospital for treatment and later filed a police report. Witnesses described the attackers as young men wearing dark clothes.",
    summary: "Robbery on 22nd March 2024 at 9 PM near railway station. Three attackers threatened with knives, stole wallet (Rs. 5,000) and mobile phone. Victim sustained minor injuries, treated at City Hospital. Police report filed."
  },
  {
    original: "Jewelry shop owner reports that armed robbers entered his shop on 25th March 2024 at 11 AM. They threatened staff with firearms and stole gold jewelry worth Rs. 20 lakhs and cash from the safe. The entire incident lasted 5 minutes. Staff members were unharmed but traumatized. Police have been notified and investigation is ongoing. Security footage shows the robbers' faces clearly.",
    summary: "Armed robbery at jewelry shop on 25th March 2024 at 11 AM. Robbers threatened staff with firearms, stole gold jewelry worth Rs. 20 lakhs and cash from safe. Incident lasted 5 minutes, staff unharmed. Security footage available."
  },

  // Murder Cases
  {
    original: "Police report that on 26th March 2024, a 45-year-old male was found dead in his apartment with multiple stab wounds. The victim appears to have been attacked by unknown assailants. The building residents reported hearing arguments the previous night. Forensic team has collected evidence from the crime scene. Investigation is ongoing to identify suspects and determine motive. No arrests have been made yet.",
    summary: "Murder case on 26th March 2024. 45-year-old male found dead in apartment with multiple stab wounds. Unknown assailants, previous night's arguments reported. Forensic evidence collected, investigation ongoing."
  },
  {
    original: "Family reports that their 28-year-old son was shot dead during a road rage incident on 24th March 2024. The suspect fled the scene after shooting the victim multiple times. Witnesses provided vehicle description and partial license plate number. Victim was pronounced dead at the scene. Police have launched a manhunt for the suspect. The incident occurred on Highway 45 near the city exit.",
    summary: "Road rage murder on 24th March 2024 on Highway 45. 28-year-old victim shot multiple times, pronounced dead at scene. Suspect fled, witnesses provided vehicle description. Police manhunt ongoing."
  },

  // Assault Cases
  {
    original: "Student reports that on 20th March 2024, he was attacked by a group of 4-5 senior students in the college campus over a previous rivalry. They punched and kicked him, resulting in multiple injuries including a fractured arm and bruises. The college authorities were informed and disciplinary action has been initiated against the accused students. The victim is receiving medical treatment.",
    summary: "Campus assault on 20th March 2024. Student attacked by 4-5 seniors over rivalry, sustained fractured arm and bruises. College authorities informed, disciplinary action initiated, victim receiving treatment."
  },
  {
    original: "Restaurant customer reports that on 23rd March 2024, he was physically assaulted by the restaurant staff after complaining about food quality. The manager and two waiters pushed him and threatened him with violence. Other customers witnessed the incident and provided statements to police. The victim sustained minor injuries and filed a complaint against the restaurant.",
    summary: "Restaurant assault on 23rd March 2024. Customer physically assaulted by staff after food quality complaint. Manager and two waiters pushed and threatened customer. Witnesses provided statements, police complaint filed."
  },

  // Domestic Violence Cases
  {
    original: "Woman reports that during a domestic dispute on 25th March 2024, her husband physically assaulted her, causing bruises on her face and arms. The incident occurred at their residence at 456 Park Avenue. She has been married for 5 years and this is not the first incident of violence. She has sought medical help and filed a police complaint. The husband has been arrested.",
    summary: "Domestic violence on 25th March 2024 at 456 Park Avenue. Husband physically assaulted wife, causing bruises on face and arms. Not first incident, wife sought medical help and filed complaint. Husband arrested."
  },
  {
    original: "Woman reports that her in-laws have been subjecting her to mental and physical cruelty for dowry demands for the past 2 years. They harass her daily and threaten to throw her out of the house if dowry is not paid. She has been married for 3 years and has a 1-year-old child. She finally filed a complaint after being severely beaten.",
    summary: "Dowry harassment case spanning 2 years. In-laws subjected woman to mental and physical cruelty for dowry demands. Daily harassment, threats, and beatings. Married 3 years with 1-year-old child. Complaint filed after severe beating."
  },

  // Fraud Cases
  {
    original: "Business owner reports that his employee, the accountant, has been embezzling company funds for the past 6 months. An audit revealed that Rs. 25 lakhs has been siphoned off through fake invoices and manipulated accounts. The employee has been missing since the audit began. Police have been notified and a case of cheating and breach of trust has been registered. Company is conducting internal audit to assess total losses.",
    summary: "Embezzlement case spanning 6 months. Accountant siphoned Rs. 25 lakhs through fake invoices and manipulated accounts. Employee missing since audit discovery. Police case registered for cheating and breach of trust."
  },
  {
    original: "Elderly person reports that someone claiming to be a government officer called and told her she had won a lottery of Rs. 10 lakhs. To claim the prize, she was asked to pay Rs. 50,000 as processing fees. She paid the amount but never received any prize money. The phone number is now unreachable. She realized it was a scam and filed a police report.",
    summary: "Lottery scam targeting elderly person. Fraudster claiming to be government officer promised Rs. 10 lakhs prize, demanded Rs. 50,000 processing fees. Victim paid but never received prize. Phone unreachable, police complaint filed."
  },

  // Cyber Crime Cases
  {
    original: "Victim reports that his social media account was hacked and unauthorized posts were made defaming his character. The hacker also accessed his private messages and threatened to leak personal information unless paid Rs. 50,000. The victim has filed a complaint with cyber crime cell. Social media platform has been notified and account has been temporarily suspended. Investigation is ongoing to trace the hacker.",
    summary: "Social media hack and extortion. Hacker accessed account, posted defaming content, threatened to leak personal information unless paid Rs. 50,000. Cyber crime complaint filed, account suspended. Investigation ongoing."
  },
  {
    original: "Business owner reports that his company website was subjected to a ransomware attack on 26th March 2024. All customer data was encrypted and hackers demanded Rs. 5 lakhs in cryptocurrency to restore access. The attack occurred during peak business hours. Company has refused to pay ransom and is working with cybersecurity experts to recover data.",
    summary: "Ransomware attack on company website on 26th March 2024. Hackers encrypted customer data, demanded Rs. 5 lakhs in cryptocurrency. Attack during peak hours. Company refused ransom, working with cybersecurity experts for data recovery."
  },

  // Kidnapping Cases
  {
    original: "Father reports that his 8-year-old son was kidnapped from school premises on 26th March 2024. Unknown persons took the child during school hours. Ransom demand of Rs. 10 lakhs was made via phone call. The child was last seen playing in the school playground. School authorities have been notified and police have launched a search operation.",
    summary: "Kidnapping of 8-year-old son from school on 26th March 2024. Unknown persons took child during school hours, demanded Rs. 10 lakhs ransom. Last seen in playground, school notified, police search operation launched."
  },
  {
    original: "Businessman reports that he was kidnapped for ransom on 24th March 2024. He was held captive for 2 days before being released after family paid Rs. 5 lakhs. The kidnappers used a van for transportation and kept him in an abandoned warehouse. He was released unharmed but traumatized. Police investigation is ongoing.",
    summary: "Businessman kidnapped for ransom on 24th March 2024. Held captive for 2 days in abandoned warehouse, released after family paid Rs. 5 lakhs ransom. Victim unharmed but traumatized, police investigation ongoing."
  },

  // Rape Cases
  {
    original: "Woman reports that she was sexually assaulted by her colleague in the office after hours on 23rd March 2024. The accused threatened her with harm if she reported the incident. Medical examination confirms sexual assault. The accused has been identified and arrested. The victim is receiving counseling and support. The company has been notified and internal investigation initiated.",
    summary: "Sexual assault in office on 23rd March 2024 after hours. Colleague assaulted victim, threatened with harm. Medical examination confirms assault, accused arrested. Victim receiving counseling, company investigation initiated."
  },
  {
    original: "Minor girl's parents report that their 14-year-old daughter was raped by a neighbor on 25th March 2024. The accused lured the child with sweets and committed the crime when parents were away. The child has been taken to hospital for medical examination and counseling. The accused has been arrested and charged under relevant sections.",
    summary: "Rape of 14-year-old minor by neighbor on 25th March 2024. Accused lured child with sweets, committed crime when parents away. Child hospitalized for medical examination and counseling. Accused arrested and charged."
  },

  // Property Dispute Cases
  {
    original: "Complainant alleges that his neighbor has illegally constructed a wall encroaching upon his property at 789 Garden Road. The encroachment is approximately 3 feet into his land. Despite verbal requests to remove the encroachment, the neighbor has refused and threatened violence. The matter has been pending in civil court for 6 months.",
    summary: "Property encroachment dispute at 789 Garden Road. Neighbor illegally constructed wall encroaching 3 feet onto complainant's land. Neighbor refused removal requests, threatened violence. Civil court case pending for 6 months."
  },
  {
    original: "Tenant reports that his landlord has illegally evicted him without proper notice and is refusing to return his security deposit of Rs. 50,000. The landlord changed the locks and threw out the tenant's belongings. The tenant had lived in the property for 3 years and always paid rent on time. Police complaint filed for illegal eviction.",
    summary: "Illegal eviction case. Landlord evicted tenant without proper notice, changed locks, disposed belongings, refusing to return Rs. 50,000 security deposit. Tenant lived 3 years with timely rent payments. Police complaint filed."
  },

  // Traffic Accident Cases
  {
    original: "Victim reports that on 28th March 2024 at 8:30 AM, his car was hit by a speeding truck at the intersection of Highway 1 and City Road. The truck driver fled the scene. The victim sustained minor injuries and his car suffered damages worth Rs. 2 lakhs. Witnesses noted the truck registration number. Police have registered a hit-and-run case.",
    summary: "Hit-and-run accident on 28th March 2024 at 8:30 AM (Highway 1 & City Road intersection). Speeding truck hit car, driver fled. Victim sustained minor injuries, car damaged (Rs. 2 lakhs). Witnesses provided truck registration, police case registered."
  },
  {
    original: "Two-wheeler rider reports that a car suddenly changed lanes without indicating, causing him to lose control and crash. He sustained a fractured arm and his bike was severely damaged. The incident occurred on 25th March 2024 at 6 PM on Ring Road. The car driver admitted fault and offered to pay for medical expenses and bike repairs.",
    summary: "Traffic accident on 25th March 2024 at 6 PM on Ring Road. Car changed lanes without indicating, causing two-wheeler rider to crash. Rider sustained fractured arm, bike severely damaged. Car driver admitted fault, offered compensation."
  },

  // Public Nuisance Cases
  {
    original: "Residents complain that a factory in their residential area operates 24 hours causing loud noise and air pollution. The factory operations affect the health and peace of mind of nearby residents, especially children and elderly. Multiple complaints have been filed with pollution control board but no action taken. Residents planning legal action.",
    summary: "Public nuisance complaint against factory in residential area. 24-hour operations causing loud noise and air pollution affecting residents' health, especially children and elderly. Multiple complaints filed with pollution board without action. Residents planning legal action."
  },
  {
    original: "Shop owners report that street vendors block the main road causing traffic congestion. The vendors create public nuisance by occupying public space and causing inconvenience to commuters and local residents. Municipal corporation has been notified multiple times but no action taken to clear the obstruction.",
    summary: "Public nuisance by street vendors blocking main road. Vendors occupy public space causing traffic congestion and inconvenience to commuters. Multiple complaints to municipal corporation without action. Road obstruction remains uncleared."
  },

  // Defamation Cases
  {
    original: "Businessman reports that his competitor has been spreading false rumors about his business on social media. The false statements have damaged his reputation and caused loss of customers. The competitor posted that the businessman sells fake products and cheats customers. Evidence of false posts has been collected. Legal notice sent.",
    summary: "Defamation case: Competitor spreading false rumors on social media about businessman's business. False claims of selling fake products and cheating customers damaged reputation and caused customer loss. Evidence collected, legal notice sent."
  },
  {
    original: "Teacher reports that a parent has been spreading false allegations against her in the school community. The parent accused her of mistreating students without any proof, damaging her professional reputation. The allegations were made during a parent-teacher meeting and shared on social media. Teacher considering defamation lawsuit.",
    summary: "Defamation against teacher. Parent spreading false allegations of student mistreatment in school community and on social media without proof. Damaged teacher's professional reputation. Allegations made during parent-teacher meeting. Teacher considering defamation lawsuit."
  }
];
