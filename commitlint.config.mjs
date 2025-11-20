// commitlint.config.mjs
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 1. Enforce standard types (feat, fix, etc.)
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation
        'style',    // Formatting
        'refactor', // Code restructuring
        'perf',     // Performance
        'test',     // Tests
        'chore',    // Maintenance
        'ci',       // CI/CD
        'revert',   // Reverting changes
        'build',    // Build configs
      ],
    ],
    // 2. Define your Monorepo scopes explicitly
    'scope-enum': [
      2,
      'always',
      [
        // --- Apps ---
        'rider-mobile',
        'driver-mobile',
        'driver-web',
        'admin-web',
        
        // --- Packages ---
        'ui',
        'core',
        'types',
        'state',
        'api',
        
        // --- Meta/Logical ---
        'repo',   // General repo changes
        'mobile', // Affects both mobile apps
        'web',    // Affects both web apps
        'deps',   // Dependency updates
      ],
    ],
    // 3. Allow empty scopes for chores and docs? 
    // I recommend allowing it. Set to [2, 'never'] if you want to be strict.
    'scope-empty': [1, 'never'], 
    // Force a reference to exist (except for chores/docs)
    'references-empty': [2, 'never'], 
    // 1. Types must be lowercase (feat, fix, etc.)
    'type-case': [2, 'always', 'lower-case'],
    // 2. Scopes must be kebab-case (rider-mobile, driver-web, core, ui)
    'scope-case': [2, 'always', 'kebab-case'],
  },
  /* * --- OPTIONAL: Strict Ticket Number Enforcement ---
   * Enable this parser preset if you want to force issue numbers like "KAR-123" or "#123".
   * This is "Phase 2" rigor. 
   */

  parserPreset: {
    parserOpts: {
      // Regex to find issue numbers (e.g., #123 or KAR-123)
      // feat(rider-mobile): [KAR-123] add geolocation service
      issuePrefixes: ['#', 'KAR-'], 
    },
  },
 

};