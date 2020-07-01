module.exports = { 
  "extends": "airbnb-base",
  "globals": {
    "window": true,
    "document": true,
    "event": true
  }, 
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "linebreak-style": ["error", "windows"],
    "no-restricted-globals": ["error", "event", "fdescribe"],
    "import/extensions": [
      "error",
      "ignorePackages"
      
   ]     
  }
};