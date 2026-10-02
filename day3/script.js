// Starting data
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// 1. searchNotes(word)
function searchNotes(word) {
  const lowerWord = word.toLowerCase();
  return notes.filter(note => note.text.toLowerCase().includes(lowerWord));
}

// 2. longestNote()
function longestNote() {
  if (notes.length === 0) return null;
  
  let longest = notes[0];
  for (let i = 1; i < notes.length; i++) {
    if (notes[i].text.length > longest.text.length) {
      longest = notes[i];
    }
  }
  return longest;
}

// 3. countByCategory()
function countByCategory() {
  const counts = {};
  for (let i = 0; i < notes.length; i++) {
    const category = notes[i].category;
    if (counts[category]) {
      counts[category]++;
    } else {
      counts[category] = 1;
    }
  }
  return counts;
}

// 4. getSummary()
function getSummary() {
  const counts = countByCategory();
  const total = notes.length;
  const noteWord = total === 1 ? "note" : "notes";
  
  const categoryStrings = [];
  for (const category in counts) {
    categoryStrings.push(`${counts[category]} ${category}`);
  }
  
  return `${total} ${noteWord}: ${categoryStrings.join(", ")}.`;
}

// 5. isDuplicate(text)
function isDuplicate(text) {
  const cleanText = text.trim().toLowerCase();
  return notes.some(note => note.text.trim().toLowerCase() === cleanText);
}

// 6. addNote(text, category)
function addNote(text, category) {
  const cleanText = text.trim();
  const validCategories = ["personal", "work", "study"];
  
  if (cleanText.length < 1 || cleanText.length > 200) {
    console.log("Failed: Note must be between 1 and 200 characters.");
    return false;
  }
  if (!validCategories.includes(category)) {
    console.log("Failed: Category must be 'personal', 'work', or 'study'.");
    return false;
  }
  if (isDuplicate(text)) {
    console.log("Failed: This note already exists.");
    return false;
  }
  
  const newNote = {
    id: Date.now(),
    text: cleanText,
    category: category
  };
  
  notes.push(newNote);
  console.log("Success: Note added successfully.");
  return true;
}

// --- TESTING THE FUNCTIONS ---

console.log("--- searchNotes ---");
// Normal case
console.log(searchNotes("day")); // Expected: [{ id: 2, text: "Finish the Day 3 assignment", category: "study" }]
// Edge case: No results found
console.log(searchNotes("xylophone")); // Expected: []

console.log("\n--- countByCategory ---");
// Normal case
console.log(countByCategory()); // Expected: { personal: 2, study: 2, work: 1 }

console.log("\n--- getSummary ---");
// Normal case
console.log(getSummary()); // Expected: "5 notes: 2 personal, 2 study, 1 work."

console.log("\n--- isDuplicate ---");
// Normal case
console.log(isDuplicate("Read a book")); // Expected: false
// Edge case: Ignores cases and extra spaces
console.log(isDuplicate("   CALL MUM   ")); // Expected: true

console.log("\n--- addNote ---");
// Normal case
console.log(addNote("Read a book", "personal")); // Expected: Success message and true
// Edge case 1: Duplicate note
console.log(addNote("Read a book", "personal")); // Expected: Failed duplicate message and false
// Edge case 2: Invalid category
console.log(addNote("Go for a run", "fitness")); // Expected: Failed category message and false

console.log("\n--- longestNote & getSummary Edge Cases ---");
// Normal case for longestNote
console.log(longestNote()); // Expected: { id: 3, text: "Email the project report to Grace", category: "work" }

// Edge case: Testing with 1 note (for getSummary grammar) and 0 notes (for longestNote null)
notes = [{ id: 99, text: "Only note here", category: "work" }];
console.log(getSummary()); // Expected: "1 note: 1 work." (Testing the singular "note")

notes = []; // Emptying the array
console.log(longestNote()); // Expected: null (Edge case for empty array)
