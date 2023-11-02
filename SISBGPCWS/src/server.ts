import { app } from './app';
import { APPDataSource } from './database/data-source';

APPDataSource.initialize().then(() => {
  app.listen(3010, () => console.log('Server is running! 🏆 Open http://localhost:3010/ to see results')
  );
});
