SELECT 
`rankone_start`,`rankone_end`,`ranktwo_start`,`ranktwo_end`, 
IF(rankone_start <= 18 and 18 < rankone_end , 0, IF(ranktwo_start <= 18 and 18 < ranktwo_end , 1, 2)) as 测试 
FROM `car_setup` where id = 1






select ub.id, ub.betting_time 
from user_betting ub
where ub.betting_time between "2018-02-23 15:27:00" and "2018-02-23 15:30:00"
order by ub.betting_time ASC



select id, betting_time from user_betting where betting_time 
between "2018-02-23 15:27:00" and "2018-02-23 15:30:00"
order by betting_time ASC



