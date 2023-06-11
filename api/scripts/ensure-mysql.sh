while : ; do
  mysql_user="root"
  mysql_pass="root"
  mysqladmin ping -u${mysql_user} -p${mysql_pass} --port=13306 --host=127.0.0.1 2>/dev/null 1>/dev/null;
  mysqld_running=${?}  
  if [ ${mysqld_running} -eq 0 ]; then break; 
  else echo "database isn't running. Retrying in 2 seconds"
  fi
  sleep 2
done
