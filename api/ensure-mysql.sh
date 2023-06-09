while : ; do
  mysql_user="root"
  mysql_pass="root"
  mysqld ping -u${mysql_user} -p${mysql_pass} -P 13306
  mysqld_running=${?}  
  if [ ${mysqld_running} -eq 1 ]; then break; 
  else echo "database isn't running. Retrying in 2 seconds"
  fi
  sleep 2
done
