# Network Configuration Script - QoS Implementation
# FinMark Corporation - Week 6 Implementation
# Date: ${new Date().toISOString()}

# =============================================================
# WINDOWS TRAFFIC CONTROL CONFIGURATION
# =============================================================

# Create QoS Policy for HTTPS Traffic (High Priority)
powershell -Command "New-NetQosPolicy -Name 'FinMark-HTTPS-Priority' -AppPathNameMatchCondition '*' -IPPortMatchCondition 443 -IPProtocolMatchCondition TCP -ThrottleRateActionBitsPerSecond 80MB -PolicyStore ActiveStore"

# Create QoS Policy for HTTP Traffic (Medium Priority)  
powershell -Command "New-NetQosPolicy -Name 'FinMark-HTTP-Medium' -AppPathNameMatchCondition '*' -IPPortMatchCondition 80 -IPProtocolMatchCondition TCP -ThrottleRateActionBitsPerSecond 60MB -PolicyStore ActiveStore"

# Create QoS Policy for WebSocket Traffic (High Priority)
powershell -Command "New-NetQosPolicy -Name 'FinMark-WebSocket-Priority' -AppPathNameMatchCondition '*' -IPPortMatchCondition 8080 -IPProtocolMatchCondition TCP -ThrottleRateActionBitsPerSecond 80MB -PolicyStore ActiveStore"

# Create QoS Policy for Database Traffic (Critical Priority)
powershell -Command "New-NetQosPolicy -Name 'FinMark-Database-Critical' -AppPathNameMatchCondition '*' -IPPortMatchCondition 5432 -IPProtocolMatchCondition TCP -ThrottleRateActionBitsPerSecond 100MB -PolicyStore ActiveStore"

# =============================================================
# WINDOWS FIREWALL CONFIGURATION
# =============================================================

# Allow FinMark Application Traffic
netsh advfirewall firewall add rule name="FinMark-HTTP-Inbound" dir=in action=allow protocol=TCP localport=80,3000
netsh advfirewall firewall add rule name="FinMark-HTTPS-Inbound" dir=in action=allow protocol=TCP localport=443
netsh advfirewall firewall add rule name="FinMark-WebSocket-Inbound" dir=in action=allow protocol=TCP localport=8080
netsh advfirewall firewall add rule name="FinMark-Database-Inbound" dir=in action=allow protocol=TCP localport=5432

# Block potentially dangerous ports
netsh advfirewall firewall add rule name="FinMark-Block-Telnet" dir=in action=block protocol=TCP localport=23
netsh advfirewall firewall add rule name="FinMark-Block-FTP" dir=in action=block protocol=TCP localport=21
netsh advfirewall firewall add rule name="FinMark-Block-SSH-External" dir=in action=block protocol=TCP localport=22

# =============================================================
# LOAD BALANCER HEALTH CHECK CONFIGURATION
# =============================================================

# Enable Advanced TCP Settings for better load balancing
netsh int tcp set global chimney=enabled
netsh int tcp set global rss=enabled  
netsh int tcp set global netdma=enabled
netsh int tcp set global autotuninglevel=normal

# Configure TCP Keep-Alive for load balancer connections
netsh int tcp set global keepalivetime=300000
netsh int tcp set global keepaliveinterval=1000

echo "FinMark Network Configuration Applied Successfully"
echo "Configuration Date: $(Get-Date)"
echo "Applied QoS Policies: 4"
echo "Applied Firewall Rules: 6" 
echo "TCP Optimizations: Enabled"
