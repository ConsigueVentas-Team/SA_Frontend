import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const labelMap = {
  department_automation_count: 'Automatización',                           
  department_management_count: 'gerencia',                            
  department_strategy_count: 'estrategia',                            
  department_commercial_count: 'comercial',                            
  department_operational_count: 'operaciones',   

  core_automation_count: 'automatización',                           
  core_management_count: 'gerencia',                            
  core_strategy_count: 'estrategia',                            
  core_commercial_count: 'comercial',                            
  core_operational_count: 'operaciones',                            

  profile_automation_count: 'automatización',                           
  profile_management_count: 'gerencia',                            
  profile_strategy_count: 'estrategia',                            
  profile_commercial_count: 'comercial',                            
  profile_operational_count: 'operaciones',     
  "Activos": 'Activos',
  "Termino su convenio": 'Convenio finalizado',
  "Retirado": 'Retirado',
}

const Barras = ({ barras, isCore, isDepart }) => {    

  let xAxisDataKey = "department_name";
  let barDataKey = "department_automation_count";
  let barDataKey1 = "department_management_count";
  let barDataKey2 = "department_strategy_count";
  let barDataKey3 = "department_commercial_count";
  // let barDataKey4 = "department_operational_count";
  let barDataKey4 = "Activos";
  let barDataKey5 = "Termino su convenio";
  let barDataKey6 = "Retirado";
  
  if (isDepart && !isCore) {
    xAxisDataKey = "core_name";
    barDataKey = "core_automation_count";
    barDataKey1 = "core_management_count";
    barDataKey2 = "core_strategy_count";
    barDataKey3 = "core_commercial_count";
    barDataKey4 = "core_operational_count";
    barDataKey5 = "users_convenio";
    barDataKey6 = "users_retirados";

    const uniqueData = [];
    const existingValues = new Set();
    
    for (const entry of barras) {
      const value = entry[xAxisDataKey];
      if (!existingValues.has(value)) {
        existingValues.add(value);
        uniqueData.push(entry);
      }
    }
    
    barras = uniqueData;
  } else if (isDepart && isCore) {
    xAxisDataKey = "profile_name";
    barDataKey = "profile_automation_count";
    barDataKey1 = "profile_management_count";
    barDataKey2 = "profile_strategy_count";
    barDataKey3 = "profile_commercial_count";
    barDataKey4 = "profile_operational_count";    
  }

  return (
    <ResponsiveContainer width="100%">
      <BarChart data={barras} barSize={30}>
        <XAxis
          dataKey={'name'}          
          tickFormatter={(value) => {
            const words = value.split(" ");
            if (words.length > 1) {
              return `${words[0].slice(0, 3)}. ${words.slice(1).join(" ")}`;
            }
            return value;
          }}
        />
        <YAxis />
        <Legend 
          formatter={(name) => [labelMap[name]]}          
        />
        <Tooltip
          formatter={(value, name) => [value, labelMap[name]]}
          labelStyle={{ color: "black", textTransform: "uppercase" }}
          contentStyle={{ fontWeight: "bold", fontSize: "16px" }}
          itemStyle={{ padding: 3, margin: 0 }}
        />        
        <CartesianGrid
          strokeDasharray="1 0"
          horizontal={true}
          vertical={false}
        />                
        <Bar
          dataKey={'Activos'}
          fill="#496ddb"
        />                              
        <Bar
          dataKey={'Termino su convenio'}
          fill="#e16036"
        />        
        <Bar
          dataKey={'Retirado'}
          fill="#136f63"
        />        
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barras;
