# GHAS Demo App - Test Suite

## 🎯 **AI Teaching Exercise**

This test suite is **intentionally incomplete** - it's designed for **generative AI practice**!

### **Exercise Overview**
Your mission: **Complete the TODO tests** using AI assistance. This teaches:
- **Test-driven development** with AI
- **Mocking and stubbing** techniques
- **Security testing** patterns
- **Jest framework** best practices

### **Test Structure**

#### **✅ Working Tests**
- Basic Jest setup and configuration
- Dependency validation tests
- Test utilities and mocks

#### **🤖 AI Exercise Tests (TODOs)**
All tests marked with `// TODO: AI EXERCISE` need completion:

1. **App Initialization Tests**
   - Test ASCII art banner display
   - Test menu option rendering

2. **Dependency Injection Tests**
   - Test vulnerable lodash injection
   - Test success message logging

3. **Code Scanning Tests**
   - Test vulnerable code file creation
   - Test eval() vulnerability patterns
   - Test SQL injection patterns

4. **Secret Scanning Tests**
   - Test fake secrets file creation
   - Test API key pattern detection

5. **Error Handling Tests**
   - Test file system error handling
   - Test malformed JSON handling

### **Getting Started**

```bash
# Install dependencies
npm install

# Run tests (will show failures for TODO items)
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### **AI Exercise Instructions**

1. **Choose a TODO test** from the list above
2. **Ask your AI assistant** to help implement it
3. **Use the hints** provided in each TODO comment
4. **Test your implementation** with `npm test`
5. **Repeat** for other TODO tests

### **Example AI Prompt**
```
"Help me implement the test 'should display ASCII art banner' in tests/index.test.js.
The test should verify that the app displays the figlet banner when initialized."
```

### **Learning Objectives**
- ✅ **Jest mocking** techniques
- ✅ **File system testing** patterns
- ✅ **Console output** testing
- ✅ **Security vulnerability** testing
- ✅ **Error handling** test scenarios
- ✅ **Integration testing** approaches

### **Test Utilities Available**
- `testUtils.captureConsoleOutput()` - Capture console.log calls
- `testUtils.mockFileSystem()` - Mock file system operations
- Global mocks for `inquirer`, `figlet`, and `chalk`

### **Success Criteria**
- All TODO tests pass
- Code coverage > 80%
- Tests are **readable and maintainable**
- **Security-focused** test patterns implemented

---

**Happy testing! 🚀** Remember: **Good tests are like good documentation** - they tell the story of what your code should do!
