# Documentation: How to Run the Tests
## Install dependencies:

## Make sure Playwright is installed in your project:
```$npm install @playwright/test```
### Run Tests:
To run all the tests:
```$npx playwright test```

To run a specific test (e.g., login test):
```$npx playwright test tests/login.spec.js```

## View Reports:
### After running the tests, you can view the test report by running:

```$npx playwright show-report```
This will open an interactive HTML report where you can see test results and trace failures if any.