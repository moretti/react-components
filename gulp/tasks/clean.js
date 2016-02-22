import gulp from 'gulp';
import del from 'del';

gulp.task('clean:icons', () => {
  return del('icons/components');
});
