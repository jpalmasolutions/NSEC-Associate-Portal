time_stamp=$(date +"%b_%d_%Y_%H_%M_%S")
function_name=nsec-associate-portal
bucket=jpalmasolutions
key=zip/$function_name/$time_stamp.zip
artifact_name=s3://$bucket/$key
zip -r project.zip * -x zip.sh
aws s3 cp project.zip $artifact_name
rm project.zip
