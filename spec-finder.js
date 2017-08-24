var context = require.context('./src', true, /.+\.spec\.tsx?$/);
context.keys().forEach(context);